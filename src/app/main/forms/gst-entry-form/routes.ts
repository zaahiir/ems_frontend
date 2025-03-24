import { Routes } from '@angular/router';

export const gstRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'GST Entry'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./list-gst-entry-form/list-gst-entry-form.component').then(m => m.ListGstEntryFormComponent),
        data: {
          title: 'List'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-gst-entry-form/create-gst-entry-form.component').then(m => m.CreateGstEntryFormComponent),
        data: {
          title: 'Create'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-gst-entry-form/update-gst-entry-form.component').then(m => m.UpdateGstEntryFormComponent),
        data: {
          title: 'Update'
        },
      }
    ]
  }
];
