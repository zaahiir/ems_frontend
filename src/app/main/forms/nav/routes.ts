import { Routes } from '@angular/router';

export const navRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Nav'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./list-nav/list-nav.component').then(m => m.ListNavComponent),
        data: {
          title: 'List'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-nav/update-nav.component').then(m => m.UpdateNavComponent),
        data: {
          title: 'Update'
        },
      }
    ]
  }
];
