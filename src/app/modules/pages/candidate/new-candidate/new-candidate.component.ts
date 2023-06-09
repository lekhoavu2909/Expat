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

  nzOptions: any[] | null = null;
  values: any[] | null = null;
  

  onChanges(values: any): void {
    console.log(values, this.values);
  }


  submitForm(): void {
    if (this.newCandidateForm.valid) {
      console.log('submit', this.newCandidateForm.value);
    } else {
      Object.values(this.newCandidateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  constructor(private fb: UntypedFormBuilder) {}
  ngOnInit(): void {
      
  }
}
