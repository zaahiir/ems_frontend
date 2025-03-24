import { Routes } from '@angular/router';

export const issueRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Issue'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        loadComponent: () => import('./list-issue/list-issue.component').then(m => m.ListIssueComponent),
        data: {
          title: 'List'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-issue/create-issue.component').then(m => m.CreateIssueComponent),
        data: {
          title: 'Create'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-issue/update-issue.component').then(m => m.UpdateIssueComponent),
        data: {
          title: 'Update'
        },
      }
    ]
  }
];
