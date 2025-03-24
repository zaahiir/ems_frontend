import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Forms',
    url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Daily Entry Form',
        url: '/forms/dailyEntry',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'AUM Entry Form',
        url: '/forms/aum',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'ARN Master Form',
        url: '/forms/arn',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'AMC Master Form',
        url: '/forms/amc',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Commission Entry Form',
        url: '/forms/commission',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'AUM Entry YOY Growth',
        url: '/forms/yoyGrowth',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Industry AUM Entry Form',
        url: '/forms/industryAum',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'GST Entry Form',
        url: '/forms/gst',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Nav',
        url: '/forms/nav',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Issue',
        url: '/forms/issue',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Statement',
        url: '/forms/statement',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Courier',
        url: '/forms/courier',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Forms',
        url: '/forms/forms',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Marketing',
        url: '/forms/marketing',
        icon: 'nav-icon-bullet'
      },
    ]
  },
  {
    name: 'Reports',
    url: '/reports',
    iconComponent: { name: 'cil-description' },
    children: [
      {
        name: 'AUM Report',
        url: '/reports/aumReport',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'ARN Wise AUM Report',
        url: '/reports/arnWiseAumReport',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'All ARN Wise AUM Report and Commission',
        url: '/reports/allArnWiseAumReport',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'GST Report',
        url: '/reports/gstReport',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'AUM Report YOY Growth',
        url: '/reports/aumReportYoyGrowth',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Industry AUM Report',
        url: '/reports/industryAumReport',
        icon: 'nav-icon-bullet'
      },
    ]
  },
  {
    name: 'Tasks',
    url: '/tasks',
    iconComponent: { name: 'cil-task' }
  },
  {
    name: 'Clients',
    url: '/clients',
    iconComponent: { name: 'cilPeople' }
  },
  {
    name: 'Employees',
    url: '/employees',
    iconComponent: { name: 'cilUser' }
  },
  {
    name: 'Expense',
    iconComponent: { name: 'cilCreditCard' },
    url: '/expense'
  },
  {
    name: 'Location',
    iconComponent: { name: 'cilLocationPin' },
    url: '/location'
  },
  {
    name: 'Attendance',
    iconComponent: { name: 'cil-calendar' },
    url: '/attendance'
  }
];
