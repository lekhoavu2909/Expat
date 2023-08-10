import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
    this.inputGroup.patchValue({
      id: this.editCache[id].data.id,
      fullName: this.editCache[id].data.fullName,
      gender: this.editCache[id].data.gender,
      interviewDate: this.editCache[id].data.interviewDate,
      stackId: this.editCache[id].data.stack.name,
      skills: this.editCache[id].data.skills.split(", "),
      experienceId: this.editCache[id].data.experience.level,
      note: this.editCache[id].data.note,
    });
    console.log(this.inputGroup.value.id);
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
    this.authService.addCandidates(this.inputGroup.value).pipe(
      tap((res) => {
        console.log(res);
      })).subscribe()
    this.editCache[id].edit = false;
    this.editVisible = false;
  }
  
  constructor(private fb: UntypedFormBuilder, private authService: AuthService, private changeDetector: ChangeDetectorRef) {
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
    this.inputGroup.value['gender'] = this.inputGroup.value['gender'][0];
    this.inputGroup.value['id'] = 0;
    const data : Candidate = this.inputGroup.value
    
    console.log(data)

    // this.authService.addCandidates(data).pipe(
    //   tap((res) => {
    //     console.log(res);
    //   })).subscribe()

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
    this.createForm()
    this.isVisible = true;
  }

  createForm(){
    this.inputGroup = this.fb.group({
      id: 0,
      fullName: [null, Validators.required],
      gender: [null, Validators.required],
      interviewDate: [null],
      stackId: [null],
      skills: [null, Validators.required],
      experienceId: [null, Validators.required],
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
    this.createForm()
    this.authService.getCandidates().pipe(
      tap((res) => {
        localStorage.setItem('Candidates', JSON.stringify(res));
        const CandString = localStorage.getItem('Candidates')
        const Cand = CandString ? JSON.parse(CandString) : {}
        for(let i = 0; i < Cand.length; i++){
          var skillsString = "";
          for(let j = 0; j < Cand[i]['skillSet'].length; j++){
            skillsString = skillsString+Cand[i]['skillSet'][j]['name']+", "
          }
          Cand[i]['skills'] = skillsString.substring(0, skillsString.length-2);
          const date = new Date(Cand[i]['interviewDate'])
          const dateFormatted = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          }).format(date);
          Cand[i]['interviewDate'] = dateFormatted;
        }

        this.listOfData = Cand
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
          skillNodes[i]['value'] = skillNodes[i]['name'];
          skillNodes[i]['title'] = skillNodes[i]['name'];
          skillNodes[i]['key'] = skillNodes[i]['id'];
        }

        this.skillNodes = skillNodes;
      })
    ).subscribe();
  }

  // ngAfterContentChecked(): void {
  //   this.changeDetector.detectChanges();
  // }
}
