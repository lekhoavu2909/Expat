import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Candidate } from 'src/app/modules/auth/login/post.model';

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
      value: 'FeMale',
      label: 'Female',
      isLeaf: true
    },
    {
      value: 'Male',
      label: 'Male',
      isLeaf: true
    }
  ];
  modalVisible = false;
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
  
  constructor(private fb: UntypedFormBuilder, private authService: AuthService, private changeDetector: ChangeDetectorRef) {
    // this.createForm()
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
    this.inputGroup.value['skills'] = JSON.stringify(this.inputGroup.value['skills']);
    // this.inputGroup.value['interviewDate'] = this.inputGroup.value['interviewDate'].toLocaleDateString();
    this.inputGroup.value['interviewDate'] = "2023-08-07T04:26:55.218Z";
    this.inputGroup.value['gender'] = this.inputGroup.value['gender'][0];

    const data : Candidate = this.inputGroup.value
    
    this.authService.addCandidates(data).pipe(
      tap((res) => {
        console.log(res);
      })).subscribe()

    // this.createForm()
    this.updateEditCache();
    this.handleCancel()
  }

  findSkill(skillName: string){
    const skillString = localStorage.getItem('Skill')
    const skillsAPI = skillString ? JSON.parse(skillString) : {};
    for(let i = 0; i< skillsAPI.length; i++){
      if(skillsAPI[i].name == skillName){
        return skillsAPI[i];
      }
    }
    return null;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter((d:any) => d.id !== id);
  }

  showModal(): void {
    this.handleCancel()
    this.updateEditCache();
    this.isVisible = true;
    this.createForm()
  }

  createForm(){
    this.inputGroup = this.fb.group({
      fullName: [null],
      gender: [null],
      interviewDate: [null],
      stackId: [null],
      skills: [null],
      experienceId: [null],
      note: [null]
    });
  }

  showSkill(): void {
    this.modalVisible = true;
  }

  handleModal(): void {
    this.modalVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.editVisible = false;
  }

  ngOnInit(): void {
    this.authService.getCandidates().pipe(
      tap((res) => {
        localStorage.setItem('Candidates', JSON.stringify(res));
        const CandString = localStorage.getItem('Candidates')
        this.listOfData = CandString ? JSON.parse(CandString) : {}
        this.updateEditCache();
      })
    ).subscribe();

    this.authService.getSettings('Stack').pipe(
      tap((response: any) => {
        const stackString = localStorage.getItem('Stack');
        const stackOption = stackString ? JSON.parse(stackString) : {};

        for(let i = 0; i<stackOption.length; i++){
          stackOption[i]['isLeaf'] = true;
          stackOption[i]['title'] = stackOption[i]['name'];
          stackOption[i]['key'] = stackOption[i]['id'];
        }

        this.stackOptions = stackOption;
      })
    ).subscribe()

    this.authService.getSettings('Experience').pipe(
      tap((response: any) => {
        const experienceString = localStorage.getItem('Experience');
        const experienceOptions = experienceString ? JSON.parse(experienceString) : {};

        for(let i = 0; i<experienceOptions.length; i++){
          experienceOptions[i]['isLeaf'] = true;
          experienceOptions[i]['title'] = experienceOptions[i]['level'];
          experienceOptions[i]['key'] = experienceOptions[i]['id'];
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
          skillNodes[i]['key'] = skillNodes[i]['id'];
        }

        this.skillNodes = skillNodes;
      })
    ).subscribe();

    this.createForm()
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
