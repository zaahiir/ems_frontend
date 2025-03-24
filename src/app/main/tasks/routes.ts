import { Routes } from '@angular/router';

export const tasksRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Tasks'
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./list-tasks/list-tasks.component').then(m => m.ListTasksComponent),
        data: {
          title: 'List Tasks'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-tasks/create-tasks.component').then(m => m.CreateTasksComponent),
        data: {
          title: 'New Task'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-tasks/update-tasks.component').then(m => m.UpdateTasksComponent),
        data: {
          title: 'Update Tasks'
        },
      }
    ]
  }
];
