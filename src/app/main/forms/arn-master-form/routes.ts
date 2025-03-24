import { Routes } from '@angular/router';

export const arnFormRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'ARN Master'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./list-arn-master-form/list-arn-master-form.component').then(m => m.ListArnMasterFormComponent),
        data: {
          title: 'List'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-arn-master-form/create-arn-master-form.component').then(m => m.CreateArnMasterFormComponent),
        data: {
          title: 'Create'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-arn-master-form/update-arn-master-form.component').then(m => m.UpdateArnMasterFormComponent),
        data: {
          title: 'Edit'
        },
      }
    ]
  }
];
