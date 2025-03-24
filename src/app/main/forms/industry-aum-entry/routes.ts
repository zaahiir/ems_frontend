import { Routes } from '@angular/router';

export const industryAumRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Industry AUM'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./list-industry-aum-entry/list-industry-aum-entry.component').then(m => m.ListIndustryAumEntryComponent),
        data: {
          title: 'List'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-industry-aum-entry/create-industry-aum-entry.component').then(m => m.CreateIndustryAumEntryComponent),
        data: {
          title: 'Create'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-industry-aum-entry/update-industry-aum-entry.component').then(m => m.UpdateIndustryAumEntryComponent),
        data: {
          title: 'Update'
        },
      }
    ]
  }
];
