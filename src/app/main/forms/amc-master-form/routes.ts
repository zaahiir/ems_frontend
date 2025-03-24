// amc-form.routes.ts
import { Routes } from '@angular/router';
import { RoleGuard } from '../../../auth/role.guard';

export const amcFormRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'AMC Master'
    },
    children: [
      {
        path: '',
        redirectTo: 'aum',
        pathMatch: 'full'
      },
      {
        path: '',
        loadComponent: () => import('./list-amc-master-form/list-amc-master-form.component').then(m => m.ListAmcMasterFormComponent),
        data: {
          title: 'List',
          roles: ['superuser', 'admin', 'staff', 'client']
        },
        canActivate: [RoleGuard]
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-amc-master-form/update-amc-master-form.component').then(m => m.UpdateAmcMasterFormComponent),
        data: {
          title: 'Edit',
          // roles: ['superuser', 'admin']
        },
        // canActivate: [RoleGuard]
      }
    ]
  }
];