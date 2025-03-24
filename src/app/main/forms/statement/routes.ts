import { Routes } from '@angular/router';

export const statementRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Statement'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./list-statement/list-statement.component').then(m => m.ListStatementComponent),
        data: {
          title: 'List'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-statement/create-statement.component').then(m => m.CreateStatementComponent),
        data: {
          title: 'Create'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-statement/update-statement.component').then(m => m.UpdateStatementComponent),
        data: {
          title: 'Update'
        },
      }
    ]
  }
];
