import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeSixRoutingModule } from './home-six-routing.module';
import { HomeSixComponent } from './home-six.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TooltipModule } from 'ng2-tooltip-directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeSixComponent],
  imports: [
    CommonModule,
    HomeSixRoutingModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    SlickCarouselModule,
    TooltipModule,
    SharedModule
  ],
})
export class HomeSixModule { }
