import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-view-balance',
  templateUrl: './view-balance.component.html',
  styleUrls: ['./view-balance.component.css']
})
export class ViewBalanceComponent implements OnInit {

  catcher = 1;
  credit = 0;
  id = 1;
  outcoming = 0;
  incoming = 0;
  datatable : any;
  constructor() 
  {
    const table: any = $('#balance');
    this.datatable = table.DataTable();
  }
  ngOnInit(): void {
  }



}
