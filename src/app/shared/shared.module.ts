import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MaskIdPipe } from './pipes/mask-id.pipe';

import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [NavbarComponent, SidebarComponent, LayoutComponent, MaskIdPipe],
  imports: [CommonModule, RouterModule, MenubarModule, MenuModule, ButtonModule],
  exports: [NavbarComponent, SidebarComponent, LayoutComponent, MaskIdPipe, CommonModule]
})
export class SharedModule {}
