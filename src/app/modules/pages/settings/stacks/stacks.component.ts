import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup,  } from '@angular/forms';

interface ItemData {
  id: string;
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'app-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.scss']
})
export class StacksComponent implements OnInit {
  i=0
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];
  inputGroup!: UntypedFormGroup;

  startEdit(id: string): void {
    this.updateEditCache();
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index]},
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }
  constructor(private fb: UntypedFormBuilder) {}


  saveOriginal(): void {
    console.log('submit', this.inputGroup.value);
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: this.inputGroup.value['name'],
        age: this.inputGroup.value['age'],
        address: this.inputGroup.value['address']
      }
    ];
    this.i++;
    this.updateEditCache();
    this.inputGroup = this.fb.group({
      name: [null],
      age:[null],
      address: [null],
    });
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
    console.log(this.i)
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  ngOnInit(): void {
    const data = [];
    for (let i = 0; i < 0; i++) {
      data.push({
        id: `${this.i}`,
        name: ``,
        age: 0,
        address: ``
      });
    }
    this.listOfData = data;
    this.updateEditCache();
    this.inputGroup = this.fb.group({
      name: [null],
      age:[null],
      address: [null],
    });
  }
}
