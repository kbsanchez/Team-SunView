import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { Page1Component } from './page1/page1.component';
import { RISPageComponent } from './rispage/rispage.component';
import { TSQPageComponent } from './tsqpage/tsqpage.component';

const routes: Routes = [
  {path: '',component:Page1Component , children: [
    {path: 'Dashboard', component: DashboardPageComponent},
    {path: 'TroubleShootQueries', component: TSQPageComponent},
    {path: 'ReindexScheduler', component: RISPageComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
