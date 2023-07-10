import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'nz-demo-table-edit-row',
  templateUrl: `./experience.component.html`,
  styleUrls: [ './experience.component.scss' ]
})
export class ExperienceComponent implements OnInit {
  i=0
  editCache: { [key: string]: { edit: boolean; data: any } } = {};
  listOfData: any 
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
    const index = this.listOfData.findIndex((item:any) => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.authService.putExp(this.editCache[id].data.id, this.editCache[id].data.level)
    this.editCache[id].edit = false;
  }
  constructor(private fb: UntypedFormBuilder, private authService: AuthService) {}


  saveOriginal(): void {
    const newLevel = this.inputGroup.value['level'];
    this.i++;
    this.authService.addExp(newLevel);
    this.updateEditCache();
    this.inputGroup = this.fb.group({
      level: [null]
    });
  }

  updateEditCache(): void {
    this.listOfData.forEach((item:any) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  getExp(){
    return this.authService.getSettings('Experience').pipe(
      tap((res)  => {
        localStorage.setItem('Experience', JSON.stringify(res));
        const JString = localStorage.getItem('Experience')
        this.listOfData = JString ? JSON.parse(JString) : {}
      })
    ).subscribe();
  }

  deleteRow(id: number): void {
    this.authService.deleteExp(id);
    this.listOfData = this.listOfData.filter((d:any) => d.id !== id);
    console.log(id);
    this.updateEditCache();
  }

  ngOnInit(): void {
    this.authService.getSettings('Experience').pipe(
      tap((res)  => {
        localStorage.setItem('Experience', JSON.stringify(res));
        const JString = localStorage.getItem('Experience')
        console.log(JString)
        this.listOfData = JString ? JSON.parse(JString) : {}
        this.updateEditCache();
      })
    ).subscribe();
    this.inputGroup = this.fb.group({
      level: [null]
    });
  }
}
