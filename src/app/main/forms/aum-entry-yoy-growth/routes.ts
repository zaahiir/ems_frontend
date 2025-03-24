import { Routes } from '@angular/router';

export const yoyGrowthRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'AUM YOY Growth'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./list-aum-entry-yoy-growth/list-aum-entry-yoy-growth.component').then(m => m.ListAumEntryYoyGrowthComponent),
        data: {
          title: 'List'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-aum-entry-yoy-growth/create-aum-entry-yoy-growth.component').then(m => m.CreateAumEntryYoyGrowthComponent),
        data: {
          title: 'Create'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-aum-entry-yoy-growth/update-aum-entry-yoy-growth.component').then(m => m.UpdateAumEntryYoyGrowthComponent),
        data: {
          title: 'Edit'
        },
      }
    ]
  }
];
