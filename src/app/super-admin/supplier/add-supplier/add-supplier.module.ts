import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSupplierComponent } from './add-supplier.component';
import { AddSupplierRoutingModule } from './add-supplier-routing.module';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [AddSupplierComponent],
  imports: [
    CommonModule,
    AddSupplierRoutingModule,
    MatSelectCountryModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
  ],
})
export class AddSupplierModule {}
