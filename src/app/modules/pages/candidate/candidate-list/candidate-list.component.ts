import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'nz-demo-table-edit-row',
  templateUrl: `./candidate-list.component.html`,
  styleUrls: [ './candidate-list.component.scss' ]
})
export class CandidateListComponent implements OnInit {
  i=0;
  editCache: { [key: string]: { edit: boolean; data: any } } = {};
  listOfData: any
  inputGroup!: UntypedFormGroup;
  isVisible = false;
  editVisible = false;

  genderOptions = [
    {
      value: 'Male',
      label: 'Male',
      isLeaf: true
    },
    {
      value: 'FeMale',
      label: 'Female',
      isLeaf: true
    }
  ];
  
  stackOptions = [];

  experienceOptions = [];

  skillNodes = [];

  startEdit(id: string): void {
    this.updateEditCache();
    this.editCache[id].edit = true;
    this.editVisible = true
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex((item:any) => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index]},
      edit: false
    };
    this.editVisible = false;
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex((item:any) => item.id === id);
    if(this.editCache[id].data.interviewDate !== null){
      this.editCache[id].data.interviewDate = new Date(this.editCache[id].data.interviewDate).toLocaleDateString()
    }
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
    this.editVisible = false;
  }
  
  constructor(private fb: UntypedFormBuilder, private authService: AuthService) {}

  getSettings(){
    this.authService.getSettings('Stack').pipe(
      tap((response: any) => {
        const stackString = localStorage.getItem('Stack');
        const stackOptions = stackString ? JSON.parse(stackString) : {};


        for(let i = 0; i<stackOptions.length; i++){
          stackOptions[i]['isLeaf'] = true;
          stackOptions[i]['label'] = stackOptions[i]['name'];
          stackOptions[i]['key'] = stackOptions[i]['name'];
        }

        this.stackOptions = stackOptions;
      })
    ).subscribe();

    this.authService.getSettings('Experience').pipe(
      tap((response: any) => {
        const experienceString = localStorage.getItem('Experience');
        const experienceOptions = experienceString ? JSON.parse(experienceString) : {};

        for(let i = 0; i<experienceOptions.length; i++){
          experienceOptions[i]['isLeaf'] = true;
          experienceOptions[i]['label'] = experienceOptions[i]['level'];
          experienceOptions[i]['key'] = experienceOptions[i]['level'];
        }
        this.experienceOptions = experienceOptions;
      })
    ).subscribe();

    this.authService.getSettings('Skill').pipe(
      tap((response: any) => {
        const skillString = localStorage.getItem('Skill');
        const skillNodes = skillString ? JSON.parse(skillString) : {};

        for(let i = 0; i<skillNodes.length; i++){
          skillNodes[i]['isLeaf'] = true;
          skillNodes[i]['title'] = skillNodes[i]['name'];
          skillNodes[i]['key'] = skillNodes[i]['name'];
        }

        this.skillNodes = skillNodes;
      })
    ).subscribe();
  }


  updateEditCache(): void {
    this.listOfData.forEach((item:any) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  submitForm(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: this.i,
        fullName: this.inputGroup.value['Name'],
        gender: this.inputGroup.value['Gender'],
        interviewDate: this.inputGroup.value['InterviewDate'],
        stack:this.inputGroup.value['Stack'],
        skillSet:this.inputGroup.value['Skills'],
        experience:this.inputGroup.value['Experience'],
        note:this.inputGroup.value['Note']
      },
    ];

    console.log(this.listOfData)
    this.updateEditCache();
    this.inputGroup = this.fb.group({
      Name: [null],
      Gender: [null],
      InterviewDate: [null],
      Stack: [null],
      Experience: [null],
      Skills: [null],
      Note: [null]
    });
    this.handleCancel()
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter((d:any) => d.id !== id);
  }

  showModal(): void {
    this.handleCancel()
    this.updateEditCache();
    this.isVisible = true;
    this.inputGroup = this.fb.group({
      Name: [null],
      Gender: [null],
      InterviewDate: [null],
      Stack: [null],
      Experience: [null],
      Skills: [null],
      Note: [null]
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.editVisible = false;
  }

  ngOnInit(): void {
    this.getSettings()
    this.authService.getCandidates().pipe(
      tap((res) => {
        localStorage.setItem('Candidates', JSON.stringify(res));
        const CandString = localStorage.getItem('Candidates')
        this.listOfData = CandString ? JSON.parse(CandString) : {}
        this.updateEditCache();
      })
    ).subscribe();
    this.inputGroup = this.fb.group({
      Name: [null],
      Gender: [null],
      InterviewDate: [null],
      Stack: [null],
      Experience: [null],
      Skills: [null],
      Note: [null]
    });
  }
}
