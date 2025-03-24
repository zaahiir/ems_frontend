import { Routes } from '@angular/router';

export const formsRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Forms'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./list-forms/list-forms.component').then(m => m.ListFormsComponent),
        data: {
          title: 'List'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-forms/create-forms.component').then(m => m.CreateFormsComponent),
        data: {
          title: 'Create'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-forms/update-forms.component').then(m => m.UpdateFormsComponent),
        data: {
          title: 'Update'
        },
      }
    ]
  }
];
