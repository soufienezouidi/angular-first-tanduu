import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  both_section: any;
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      let section = params['section'];
      //console.log(this.activatedRoute.queryParams); // Print the parameter to the console. 
    });

  }

  ngOnInit(): void {
  }

}
