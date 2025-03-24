import { Routes } from '@angular/router';

export const employeesRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Employees'
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./list-employees/list-employees.component').then(m => m.ListEmployeesComponent),
        data: {
          title: 'List Employees'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-employees/create-employees.component').then(m => m.CreateEmployeesComponent),
        data: {
          title: 'New Employee'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-employees/update-employees.component').then(m => m.UpdateEmployeesComponent),
        data: {
          title: 'Update Employees'
        },
      }
    ]
  }
];
