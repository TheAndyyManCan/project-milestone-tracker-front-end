import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  nav = [
    {link: "#", text: "Projects"},
    {link: "/register", text: "Register"},
    {link: "/login", text: "Login"}
  ];
}
