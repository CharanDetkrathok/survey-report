import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthen: boolean = false;
  constructor() { }

  ngOnInit(): void {
       
    if(localStorage.getItem('isAuthen') == 'true') {
      this.isAuthen = true;
    }

  }

}
