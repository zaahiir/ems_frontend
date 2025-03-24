import { Routes } from '@angular/router';

export const reportRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: '',
        redirectTo: 'aumReport',
        pathMatch: 'full'
      },
      {
        path: 'aumReport',
        loadComponent: () => import('./aum-report/aum-report.component').then(m => m.AumReportComponent),
        data: {
          title: 'AUM Report'
        },
      },
      {
        path: 'arnWiseAumReport',
        loadComponent: () => import('./arn-wise-aum-report/arn-wise-aum-report.component').then(m => m.ArnWiseAumReportComponent),
        data: {
          title: 'ARN Wise AUM Report'
        },
      },
      {
        path: 'allArnWiseAumReport',
        loadComponent: () => import('./all-arn-wise-aum-report/all-arn-wise-aum-report.component').then(m => m.AllArnWiseAumReportComponent),
        data: {
          title: 'All ARN Wise AUM Report'
        },
      },
      {
        path: 'gstReport',
        loadComponent: () => import('./gst-report/gst-report.component').then(m => m.GstReportComponent),
        data: {
          title: 'GST Report'
        },
      },
      {
        path: 'aumReportYoyGrowth',
        loadComponent: () => import('./aum-report-yoy-growth/aum-report-yoy-growth.component').then(m => m.AumReportYoyGrowthComponent),
        data: {
          title: 'AUM Report YOY Growth'
        },
      },
      {
        path: 'industryAumReport',
        loadComponent: () => import('./industry-aum-report/industry-aum-report.component').then(m => m.IndustryAumReportComponent),
        data: {
          title: 'Industry AUM Report'
        },
      }
    ]
  }
];
