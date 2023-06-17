import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormModule } from 'src/app/components';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
