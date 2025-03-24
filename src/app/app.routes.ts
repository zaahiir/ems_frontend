// app.routes.ts
import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { LoginComponent } from './auth/login/login.component';
import { ClientLoginComponent } from './auth/client-login/client-login.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { UserComponent } from './auth/user/user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'client-login',
    component: ClientLoginComponent,
    data: { title: 'Client Login' }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: { title: "Home" },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./main/dashboard/routes').then(m => m.dashboardRoutes),
        // canActivate: [AuthGuard, RoleGuard],
        // data: { roles: ['superuser', 'admin', 'staff', 'client'] }
      },
      {
        path: 'forms',
        loadChildren: () => import('./main/forms/routes').then(m => m.formRoutes),
        canActivate: [AuthGuard],
        // data: { roles: ['superuser', 'admin', 'staff'] }
      },
      {
        path: 'reports',
        loadChildren: () => import('./main/reports/routes').then(m => m.reportRoutes),
        canActivate: [AuthGuard],
        // data: { roles: ['superuser', 'admin'] }
      },
      {
        path: 'tasks',
        loadChildren: () => import('./main/tasks/routes').then(m => m.tasksRoutes),
        canActivate: [AuthGuard],
        // data: { roles: ['superuser', 'admin', 'staff'] }
      },
      {
        path: 'clients',
        loadChildren: () => import('./main/clients/routes').then(m => m.clientRoutes),
        canActivate: [AuthGuard],
        // data: { roles: ['superuser', 'admin'] }
      },
      {
        path: 'employees',
        loadChildren: () => import('./main/employees/routes').then(m => m.employeesRoutes),
        canActivate: [AuthGuard],
        // data: { roles: ['superuser', 'admin'] }
      },
      {
        path: 'expense',
        loadChildren: () => import('./main/expense/routes').then(m => m.expenseRoutes),
        canActivate: [AuthGuard],
        // data: { roles: ['superuser', 'admin'] }
      },
      {
        path: 'location',
        loadChildren: () => import('./main/location/routes').then(m => m.locationRoutes),
        canActivate: [AuthGuard],
        // data: { roles: ['superuser', 'admin'] }
      },
      {
        path: 'attendance',
        loadChildren: () => import('./main/attendance/routes').then(m => m.atendanceRoutes),
        canActivate: [AuthGuard],
        // data: { roles: ['superuser', 'admin', 'staff'] }
      },{
        path: 'profile',
        component: UserComponent,
        canActivate: [AuthGuard],
        // data: { title: 'User Profile', roles: ['superuser', 'admin', 'staff', 'client'] }
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];