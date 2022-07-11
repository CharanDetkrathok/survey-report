import { Component, OnInit } from '@angular/core';
import { HomeContentService } from '../services/home-content.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private homeContent: HomeContentService
  ) { }

  ngOnInit(): void { }



}
