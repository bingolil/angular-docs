import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { CodeEditorModule } from 'src/app/components';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    HomeRoutingModule,
    CommonModule,
    FormsModule,
    DirectivesModule,
    CodeEditorModule,
  ],
})
export class HomeModule {}
