import { Routes } from '@angular/router';

export const commissionRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Commission Entry'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./list-commission-entry-form/list-commission-entry-form.component').then(m => m.ListCommissionEntryFormComponent),
        data: {
          title: 'List'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-commission-entry-form/create-commission-entry-form.component').then(m => m.CreateCommissionEntryFormComponent),
        data: {
          title: 'Create'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-commission-entry-form/update-commission-entry-form.component').then(m => m.UpdateCommissionEntryFormComponent),
        data: {
          title: 'Update'
        },
      }
    ]
  }
];
