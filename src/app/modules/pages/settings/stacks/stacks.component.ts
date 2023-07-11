import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup,  } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.scss']
})
export class StacksComponent implements OnInit {
  i=0
  editCache: { [key: string]: { edit: boolean; data: any } } = {};
  listOfData: any;
  inputGroup!: UntypedFormGroup;

  startEdit(id: string): void {
    this.updateEditCache();
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex((item:any) => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index]},
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex((item:any)  => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.authService.putStack(this.editCache[id].data.id, this.editCache[id].data.name)
    this.editCache[id].edit = false;
  }
  constructor(private fb: UntypedFormBuilder, private authService: AuthService) {}


  saveOriginal(): void {
    const newName = this.inputGroup.value['name'];
    this.i++;
    this.authService.addStack(newName)
    this.updateEditCache();
    this.inputGroup = this.fb.group({
      name: [null]
    });
  }

  updateEditCache(): void {
    this.listOfData.forEach((item:any)  => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  getStack(){
    return this.authService.getSettings('Stack');
  }

  deleteRow(id: number): void {
    this.authService.deleteStack(id);
    this.listOfData = this.listOfData.filter((d:any) => d.id !== id);
    console.log(id);
    this.updateEditCache();
  }

  ngOnInit(): void {
    this.authService.getSettings('Stack').pipe(
      tap((res)  => {
        localStorage.setItem('Stack', JSON.stringify(res));
        const JString = localStorage.getItem('Stack')
        console.log(JString)
        this.listOfData = JString ? JSON.parse(JString) : {}
        this.updateEditCache();
      })
    ).subscribe();
    this.inputGroup = this.fb.group({
      name: [null]
    });
  }
}
