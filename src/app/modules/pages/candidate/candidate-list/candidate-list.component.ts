import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

interface ItemData {
  id: string;
  name: string;
  gender:string;
  interviewDate:string;
  stack:string;
  skills:string;
  experience:string;
  note:string;
}

@Component({
  selector: 'nz-demo-table-edit-row',
  templateUrl: `./candidate-list.component.html`,
  styleUrls: [ './candidate-list.component.scss' ]
})
export class CandidateListComponent implements OnInit {
  i=0
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];
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
      value: 'Female',
      label: 'Female',
      isLeaf: true
    }
  ];

  stackOptions = [
    {
      value: 'Front-end',
      label: 'Front-end',
      isLeaf: true
    },
    {
      value: 'Back-end',
      label: 'Back-end',
      isLeaf: true
    },
    {
      value: 'Full-stack',
      label: 'Full-stack',
      isLeaf: true
    }
  ];

  experienceOptions = [
    {
      value: 'Fresher',
      label: 'Fresher',
      isLeaf: true
    },
    {
      value: 'Junior',
      label: 'Junior',
      isLeaf: true
    },
    {
      value: 'Middle',
      label: 'Middle',
      isLeaf: true
    },
    {
      value: 'Senior',
      label: 'Senior',
      isLeaf: true
    }
  ];

  skillNodes = [
    {
      title: 'HTML',
      key: 'HTML',
      isLeaf: true
    },
    {
      title: 'CSS',
      key: 'CSS',
      isLeaf: true
    },
    {
      title: 'JavaScript',
      key: 'JavaScript',
      isLeaf: true
    },
    {
      title: 'Python',
      key: 'Python',
      isLeaf: true
    },
    {
      title: 'Java',
      key: 'Java',
      isLeaf: true
    },
  ]

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
  
  constructor(private fb: UntypedFormBuilder) {}

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  submitForm(): void {
    console.log('submit', this.inputGroup.value);
    console.log('submit', this.inputGroup.value);
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: this.inputGroup.value['Name'],
        gender: this.inputGroup.value['Gender'],
        interviewDate: this.inputGroup.value['InterviewDate'],
        stack:this.inputGroup.value['Stack'],
        skills:this.inputGroup.value['Skills'],
        experience:this.inputGroup.value['Experience'],
        note:this.inputGroup.value['Note']
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
      Stack: [null],
      Experience: [null],
      Skills: [null],
      Note: [null]
    });
    this.isVisible = false;

  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
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
