import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from 'projects/layout/src/public-api';
import { HomeComponent } from './home/home.component';
import { NumbeoRoutingModule } from './tiptac-routing.module';
import { TiptacComponent } from './tiptac.component';

@NgModule({
  declarations: [TiptacComponent, HomeComponent],
  imports: [CommonModule, NumbeoRoutingModule, LayoutModule, TranslateModule],
})
export class NumbeoModule {}
