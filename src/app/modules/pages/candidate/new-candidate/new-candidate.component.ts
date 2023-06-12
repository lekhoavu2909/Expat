import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-candidate',
  templateUrl: './new-candidate.component.html',
  styleUrls: ['./new-candidate.component.scss']
})

export class NewCandidateComponent implements OnInit {
  newCandidateForm !: UntypedFormGroup;
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
      key: '0',
      isLeaf: true
    },
    {
      title: 'CSS',
      key: '1',
      isLeaf: true
    },
    {
      title: 'JavaScript',
      key: '2',
      isLeaf: true
    },
    {
      title: 'Python',
      key: '3',
      isLeaf: true
    },
    {
      title: 'Java',
      key: '4',
      isLeaf: true
    },
  ]

  nzOptions: any[] | null = null;
  values: any[] | null = null;

  submitForm(): void {
    console.log('submit', this.newCandidateForm.value);
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.newCandidateForm = this.fb.group({
      Name: [null],
      Gender: [null],
      InterviewDate: [null],
      Stack: [null],
      Experience: [null],
      Skills: [null],
      Note: [null],
      HighlightsInfo: [null],
      SoftSkills: [null],
      QuizScore: [null],
      IsRecommended: [false],
      RankNote: [null]
    });
  }
}
