import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { BlogTileComponent } from './blog-tile/blog-tile.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'projects/components/src/public-api';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, BlogTileComponent],
  imports: [CommonModule, RouterModule, ComponentsModule],
  exports: [LayoutComponent, HeaderComponent, BlogTileComponent],
})
export class LayoutModule {}
