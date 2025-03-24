import { Routes } from '@angular/router';

export const clientRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Client'
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./list-clients/list-clients.component').then(m => m.ListClientsComponent),
        data: {
          title: 'List Clients'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-clients/create-clients.component').then(m => m.CreateClientsComponent),
        data: {
          title: 'New Client'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-clients/update-clients.component').then(m => m.UpdateClientsComponent),
        data: {
          title: 'Update Clients'
        },
      },
      {
        path: 'view/:id',
        data: {
          title: 'view Clients'
        },
        loadComponent: () => import('./view-client/view-client.component').then((m) => m.ViewClientComponent),
      }
    ]
  }
];
