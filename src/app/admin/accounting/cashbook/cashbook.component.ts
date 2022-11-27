import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
@Component({
  selector: 'app-cashbook',
  templateUrl: './cashbook.component.html',
  styleUrls: ['./cashbook.component.css']
})
export class CashbookComponent implements OnInit {

  datatable : any;
  
  constructor() {}
  ngOnInit(): void {
    $(document).ready(function(){
      //$('#cashbook_tb').DataTable(); 
          var groupColumn = 3;

     var table = $('#cashbook_tb').DataTable(
        {
          "ajax": 'https://datatables.net/examples/ajax/data/objects.txt',
          "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "name" },
            { "data": "position" },
            { "data": "office" },
            { "data": "office" },
            { "data": "salary" }
        ],
    
        "order":[[1, 'asc']]    
 
    } );
   
     
    // Add event listener for opening and closing details
    $('#cashbook_tb tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
  
    });

    function format(d){

var app = '<div class="row align-items-center pb-3">\t\n' +
    '                    <div class="col-md-4 col-12 d-md-block d-none custom-short-by">\n' +
    '                        <h3 class="title pharmacy-title">Medlife Medical</h3>\n' +
    '                        <p class="doc-location mb-2 text-ellipse pharmacy-location"><i class="fas fa-map-marker-alt mr-1"></i> 96 Red Hawk Road Cyrus, MN 56323 </p>\n' +
    '                        <span class="sort-title">Showing 6 of 98 products</span>\n' +
    '                    </div>\n' +
    '      </div>\n' +

    '                <div class="row">\n' +
    '                    <div class="col-md-12 col-lg-4 col-xl-4 product-custom">\n' +
    '                        <div class="profile-widget">\n' +
    '                            <div class="doc-img">\n' +
    '                                <a [routerLink]="\'/pharmacy/product-desc\'" tabindex="-1">\n' +
    '                                    <img class="img-fluid" alt="Product image" src="assets/img/products/product.jpg">\n' +
    '                                </a>\n' +
    '                                <a href="javascript:void(0)" class="fav-btn" tabindex="-1">\n' +
    '                                    <i class="far fa-bookmark"></i>\n' +
    '                                </a>\n' +
    '                            </div>\n' +
    '                            <div class="pro-content">\n' +
    '                                <h3 class="title pb-4">\n' +
    '                                    <a [routerLink]="\'/pharmacy/product-desc\'" tabindex="-1">Benzaxapine Croplex</a> \n' +
    '                                </h3>\n' +
    '                                <div class="row align-items-center">\n' +
    '                                    <div class="col-lg-6">\n' +
    '                                        <span class="price">$19.00</span>\n' +
    '                                        <span class="price-strike">$45.00</span>\n' +
    '                                    </div>\n' +
    '                                    <div class="col-lg-6 text-right">\n' +
    '                                        <a [routerLink]="\'/pharmacy/cart\'" class="cart-icon"><i class="fas fa-shopping-cart"></i></a>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\t\t\n' +
    '                    </div>\n' +
    '                    <div class="col-md-12 col-lg-4 col-xl-4 product-custom">\n' +
    '                        <div class="profile-widget">\n' +
    '                            <div class="doc-img">\n' +
    '                                <a [routerLink]="\'/pharmacy/product-desc\'" tabindex="-1">\n' +
    '                                    <img class="img-fluid" alt="Product image" src="assets/img/products/product13.jpg">\n' +
    '                                </a>\n' +
    '                                <a href="javascript:void(0)" class="fav-btn" tabindex="-1">\n' +
    '                                    <i class="far fa-bookmark"></i>\n' +
    '                                </a>\n' +
    '                            </div>\n' +
    '                            <div class="pro-content">\n' +
    '                                <h3 class="title pb-4">\n' +
    '                                    <a [routerLink]="\'/pharmacy/product-desc\'" tabindex="-1">Rapalac Neuronium</a> \n' +
    '                                </h3>\n' +
    '                                <div class="row align-items-center">\n' +
    '                                    <div class="col-lg-6">\n' +
    '                                        <span class="price">$16.00</span>\n' +
    '                                    </div>\n' +
    '                                    <div class="col-lg-6 text-right">\n' +
    '                                        <a [routerLink]="\'/pharmacy/cart\'" class="cart-icon"><i class="fas fa-shopping-cart"></i></a>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\t\t\n' +
    '                    </div>\n' +
    '                 </div>';
       return app;
    }
  }

}
