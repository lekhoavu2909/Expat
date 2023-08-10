import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'nz-demo-table-edit-row',
  templateUrl: `./skills.component.html`,
  styleUrls: [ './skills.component.scss' ]
})
export class SkillsComponent implements OnInit {
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
    const index = this.listOfData.findIndex((item:any) => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.authService.putSkill(this.editCache[id].data.id, this.editCache[id].data.name)
    this.editCache[id].edit = false;
  }
  constructor(private fb: UntypedFormBuilder, private authService: AuthService) {}


  saveOriginal(): void {
    const newName = this.inputGroup.value['name'];
    this.i++;
    this.authService.addSkill(newName)
    this.updateEditCache();
    this.inputGroup = this.fb.group({
      name: [null]
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

  getSkill(){
    return this.authService.getSettings('Skill');
  }

  deleteRow(id: number): void {
    this.authService.deleteSkill(id);
    this.listOfData = this.listOfData.filter((d:any) => d.id !== id);
    this.updateEditCache();
  }

  ngOnInit(): void {
    this.authService.getSettings('Skill').pipe(
      tap((res)  => {
        localStorage.setItem('Skill', JSON.stringify(res));
        const JString = localStorage.getItem('Skill')
        this.listOfData = JString ? JSON.parse(JString) : {}
        this.updateEditCache();
      })
    ).subscribe();
    this.inputGroup = this.fb.group({
      name: [null]
    });
  }
}
