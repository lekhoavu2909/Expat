import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

interface ItemData {
  id: string;
  name: string;
  gender:string;
  interviewDate:string;
  highlights: string;
  softSkills: string;
  quizScore: number;
  isRecommended: string;
}

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent {
  i=0
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];
  inputGroup!: UntypedFormGroup;
  editVisible = false;

  startEdit(id: string): void {
    this.updateEditCache();
    this.editCache[id].edit = true;
    this.editVisible = true
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index]},
      edit: false
    };
    this.editVisible = false;
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    if(this.editCache[id].data.interviewDate !== null){
      this.editCache[id].data.interviewDate = new Date(this.editCache[id].data.interviewDate).toLocaleDateString()
    }
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
    this.editVisible = false;
  }

  constructor(private fb: UntypedFormBuilder, private authService: AuthService) {}

  updateEditCache(): void {
    this.listOfData.forEach(item => {
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
        id: `${this.i}`,
        name: this.inputGroup.value['Name'],
        gender: this.inputGroup.value['Gender'],
        interviewDate: this.inputGroup.value['InterviewDate'],
        highlights:this.inputGroup.value['Highlights'],
        softSkills:this.inputGroup.value['SoftSkills'],
        quizScore:this.inputGroup.value['QuizScore'],
        isRecommended:this.inputGroup.value['IsRecommended']
      },
    ];
    if(this.inputGroup.value['InterviewDate'] !== null){
      this.listOfData[this.i].interviewDate = this.inputGroup.value['InterviewDate'].toLocaleDateString()
    }
    this.i++;
    this.updateEditCache();
    this.inputGroup = this.fb.group({
      Name: [null],
      Gender: [null],
      InterviewDate: [null],
      Highlights: [null],
      SoftSkills:[null],
      QuizScore:[null],
      IsRecommended:[null]
    });
    this.handleCancel()
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  showModal(): void {
    this.handleCancel()
    this.updateEditCache();
    this.inputGroup = this.fb.group({
      Name: [null],
      Gender: [null],
      InterviewDate: [null],
      Highlights: [null],
      SoftSkills:[null],
      QuizScore:[null],
      IsRecommended:[null]
    });
  }

  handleCancel(): void {
    this.editVisible = false;
  }

  ngOnInit(): void {
    this.updateEditCache();
    this.inputGroup = this.fb.group({
      Name: [null],
      Gender: [null],
      InterviewDate: [null],
      Stack: [null],
      Experience: [null],
      Skills: [[]],
      Note: [null]
    });
  }
}
