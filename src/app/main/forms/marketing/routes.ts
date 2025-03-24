import { Routes } from '@angular/router';

export const marketingRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Marketing'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./list-marketing/list-marketing.component').then(m => m.ListMarketingComponent),
        data: {
          title: 'List'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-marketing/create-marketing.component').then(m => m.CreateMarketingComponent),
        data: {
          title: 'Create'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-marketing/update-marketing.component').then(m => m.UpdateMarketingComponent),
        data: {
          title: 'Update'
        },
      }
    ]
  }
];
