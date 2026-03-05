import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/dashboard'] },
    {
      label: 'Employees',
      icon: 'pi pi-users',
      items: [
        { label: 'View All', icon: 'pi pi-list', routerLink: ['/employees'] },
        { label: 'Create New', icon: 'pi pi-plus', routerLink: ['/employees/create'] }
      ]
    },
    { label: 'Documents', icon: 'pi pi-file', routerLink: ['/employees'] },
    { label: 'Onboarding Checklists', icon: 'pi pi-check-square', routerLink: ['/employees'] },
    { label: 'Reports', icon: 'pi pi-chart-bar', disabled: true }
  ];
}
