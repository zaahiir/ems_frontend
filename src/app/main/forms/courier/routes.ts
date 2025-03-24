import { Routes } from '@angular/router';

export const courierRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Courier'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./list-courier/list-courier.component').then(m => m.ListCourierComponent),
        data: {
          title: 'List'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-courier/create-courier.component').then(m => m.CreateCourierComponent),
        data: {
          title: 'Create'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-courier/update-courier.component').then(m => m.UpdateCourierComponent),
        data: {
          title: 'Update'
        },
      },
      {
        path: 'view/:id',
        loadComponent: () => import('./view-courier/view-courier.component').then(m => m.ViewCourierComponent),
        data: {
          title: 'View'
        },
      }
    ]
  }
];
