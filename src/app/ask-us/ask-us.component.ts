import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ask-us',
  templateUrl: './ask-us.component.html',
  styleUrls: ['./ask-us.component.css'],
})
export class AskUsComponent implements OnInit {
  panelOpenState = false;
  constructor() {}
  items = [
    'Subject 1',
    'Subject 2',
    'Subject 3',
    'Subject 4',
    'Subject 5',
    'Subject 6',
    'Subject 7',
    'Subject 8',
    'Subject 9',
  ];
  itemss = ['Question 1', 'Question 2', 'Question 3', 'Question 4'];
  images = [
    {
      path: 'assets/img/features/feature-01.jpg',
    },
    {
      path: 'assets/img/features/feature-02.jpg',
    },
    {
      path: 'assets/img/features/feature-03.jpg',
    },
    {
      path: 'assets/img/features/feature-04.jpg',
    },
  ];
  con;
  expandedIndex = 0;
  ngOnInit(): void {}
}
