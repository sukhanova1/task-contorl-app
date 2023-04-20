import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';

const dashboardRoutes: Routes = [
  { path: '', component: DashboardComponent},
  { path: ':id', component: BoardDetailsComponent},
];

const routes: Routes = [
  { path: 'dashboard', component: HomeComponent, children: dashboardRoutes, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
