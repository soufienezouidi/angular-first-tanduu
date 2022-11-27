import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from './../../common-service.service'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

 	favourites:any = [];
  constructor(public commonService:CommonServiceService) { }

  ngOnInit(): void {
  	this.getFavourites();
  }

  getFavourites() {
  	this.commonService.getFav()
  		.subscribe(res=>{
        this.favourites = res;
  		})
  }

  unfav(fav) {
    this.commonService.deleteFav(fav.id)
      .subscribe(res=>{
          this.getFavourites();
      })
  }


}
