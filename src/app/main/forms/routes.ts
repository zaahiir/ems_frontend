import { Routes } from '@angular/router';

export const formRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Forms'
    },
    children: [
      {
        path: '',
        redirectTo: 'dailyEntry',
        pathMatch: 'full'
      },
      {
        path: 'aum',
        loadChildren: () => import('./aum-entry/routes').then(m => m.aumEntryRoutes),
        data: { title: 'AUM Entry' }
      },
      {
        path: 'arn',
        loadChildren: () => import('./arn-master-form/routes').then(m => m.arnFormRoutes),
      },
      {
        path: 'amc',
        loadChildren: () => import('./amc-master-form/routes').then(m => m.amcFormRoutes),
      },
      {
        path: 'dailyEntry',
        loadChildren: () => import('./daily-entry/routes').then(m => m.dailyEntryRoutes),
      },
      {
        path: 'commission',
        loadChildren: () => import('./commission-entry-form/routes').then(m => m.commissionRoutes),
      },
      {
        path: 'yoyGrowth',
        loadChildren: () => import('./aum-entry-yoy-growth/routes').then(m => m.yoyGrowthRoutes),
      },
      {
        path: 'industryAum',
        loadChildren: () => import('./industry-aum-entry/routes').then(m => m.industryAumRoutes),
      },
      {
        path: 'gst',
        loadChildren: () => import('./gst-entry-form/routes').then(m => m.gstRoutes),
      },
      {
        path: 'nav',
        loadChildren: () => import('./nav/routes').then(m => m.navRoutes),
      },
      {
        path: 'issue',
        loadChildren: () => import('./issue/routes').then(m => m.issueRoutes),
      },
      {
        path: 'statement',
        loadChildren: () => import('./statement/routes').then(m => m.statementRoutes),
      },
      {
        path: 'courier',
        loadChildren: () => import('./courier/routes').then(m => m.courierRoutes),
      },
      {
        path: 'forms',
        loadChildren: () => import('./forms/routes').then(m => m.formsRoutes),
      },
      {
        path: 'marketing',
        loadChildren: () => import('./marketing/routes').then(m => m.marketingRoutes),
      }
    ]
  }
];
