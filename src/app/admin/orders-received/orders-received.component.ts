import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-received',
  templateUrl: './orders-received.component.html',
  styleUrls: ['./orders-received.component.css']
})
export class OrdersReceivedComponent implements OnInit {

  constructor() { }
  new = true;
  ngOnInit(): void {
  }

}
