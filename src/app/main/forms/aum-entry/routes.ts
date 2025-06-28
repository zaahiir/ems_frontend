import { Routes } from '@angular/router';

export const aumEntryRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'AUM Entry'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./list-aum-entry/list-aum-entry.component').then(m => m.ListAumEntryComponent),
        data: {
          title: 'List'
        }
      },
      {
        path: 'add',
        loadComponent: () => import('./create-aum-entry/create-aum-entry.component').then(m => m.CreateAumEntryComponent),
        data: {
          title: 'Create'
        }
      },
      {
        path: 'upload',
        loadComponent: () => import('./upload-aum-entry/upload-aum-entry/upload-aum-entry.component').then(m => m.UploadAumEntryComponent),
        data: {
          title: 'Upload'
        }
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-aum-entry/update-aum-entry.component').then(m => m.UpdateAumEntryComponent),
        data: {
          title: 'Edit'
        }
      }
    ]
  }
];
