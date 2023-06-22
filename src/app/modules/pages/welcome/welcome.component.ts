import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  isCollapsed = false;
  constructor(private route : Router) { }
  username = localStorage.getItem('username')
  email = localStorage.getItem('email')
  photoUrl = localStorage.getItem('photoUrl')
  knownAs = localStorage.getItem('knownAs')
  gender = localStorage.getItem('gender')
  drawerVisible = false

  logout(){
    localStorage.clear();
    this.route.navigate(['/login'])
  }

  openDrawer(): void {
    this.drawerVisible = true
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  ngOnInit() {
    this.username = localStorage.getItem('username')
    this.email = localStorage.getItem('email')
    this.photoUrl = localStorage.getItem('photoUrl')
    this.knownAs = localStorage.getItem('knownAs')
    this.gender = localStorage.getItem('gender')
  }

}
