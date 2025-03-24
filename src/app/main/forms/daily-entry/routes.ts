import { Routes } from '@angular/router';

export const dailyEntryRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Daily Entry Form'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./list-daily-entry/list-daily-entry.component').then(m => m.ListDailyEntryComponent),
        data: {
          title: 'List'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-daily-entry/create-daily-entry.component').then(m => m.CreateDailyEntryComponent),
        data: {
          title: 'Create'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-daily-entry/update-daily-entry.component').then(m => m.UpdateDailyEntryComponent),
        data: {
          title: 'Update'
        },
      }
    ]
  }
];
