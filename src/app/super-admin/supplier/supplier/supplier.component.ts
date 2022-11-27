import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent implements OnInit {
  datatable: any;
  constructor() {}

  ngOnInit(): void {
    const table: any = $('table');
    this.datatable = table.DataTable().data(this.royaltypartners);
  }
  royaltypartners: any = [
    {
      coutryname: 'Germany',
      email: 'info@tunafanya.com',
      provision: 20,
      company: 'Tanduu',
      country_code: 'de',
      license_exp: '06/11/2023',
      is_active: true,
    },
    {
      coutryname: 'Algeria',
      email: 'info@tunafanya.com',
      provision: 20,
      company: 'Tanduu',
      country_code: 'dz',
      license_exp: '06/11/2023',
      is_active: true,
    },
    {
      coutryname: 'Tunisia',
      email: 'info@tunafanya.com',
      provision: 20,
      company: 'Tunafanya',
      country_code: 'tn',
      license_exp: '06/11/2023',
      is_active: true,
    },

    {
      coutryname: 'United Kingdom',
      email: 'info@tunafanya.com',
      provision: 20,
      company: 'Tanduu',
      country_code: 'gb',
      license_exp: '06/11/2023',
      is_active: false,
    },

    {
      coutryname: 'Belgium',
      email: 'info@tunafanya.com',
      provision: 20,
      company: 'Tanduu',
      country_code: 'be',
      license_exp: '06/11/2023',
      is_active: false,
    },

    {
      coutryname: 'Monaco',
      email: 'info@tunafanya.com',
      provision: 20,
      company: 'Tanduu',
      country_code: 'mc',
      license_exp: '06/11/2023',
      is_active: false,
    },
    {
      coutryname: 'Morocco',
      email: 'info@tunafanya.com',
      provision: 20,
      company: 'Tanduu',
      country_code: 'ma',
      license_exp: '06/11/2023',
      is_active: false,
    },
    {
      coutryname: 'Canada',
      email: 'info@tunafanya.com',
      provision: 20,
      company: 'Shell',
      country_code: 'ca',
      license_exp: '06/11/2023',
      is_active: false,
    },
    {
      coutryname: 'Liechtenstein ',
      email: 'info@tunafanya.com',
      provision: 20,
      company: 'Shell',
      country_code: 'li',
      license_exp: '06/11/2023',
      is_active: true,
    },
    {
      coutryname: 'Austrie ',
      email: 'info@tunafanya.com',
      provision: 20,
      company: 'Shell',
      country_code: 'at',
      license_exp: '06/11/2023',
      is_active: false,
    },
    {
      coutryname: 'France ',
      email: 'info@tunafanya.com',
      provision: 20,
      company: 'Shell',
      country_code: 'fr',
      license_exp: '06/11/2023',
      is_active: false,
    },
    {
      coutryname: 'Luxembourg ',
      email: 'info@tunafanya.com',
      provision: 20,
      company: 'Tanduu',
      country_code: 'lu',
      license_exp: '06/11/2023',
      is_active: true,
    },
  ];
  async facturation(a: any) {
    const inputValue = a;

    Swal.fire({
      title: 'Enter the provision',
      input: 'text',
      inputValue: inputValue,

      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!';
        }
      },
    });
  }
}
