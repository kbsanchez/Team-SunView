import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { TSQPageComponent } from './tsqpage/tsqpage.component';
import { RISPageComponent } from './rispage/rispage.component';
import { IndexesComponent } from './dashboard-page/indexes/indexes.component';
import { IndexComponent } from './dashboard-page/indexes/index/index.component';
import { MaterialModule } from './material/material.module';
import { IndexService } from './shared/index.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    DashboardPageComponent,
    TSQPageComponent,
    RISPageComponent,
    IndexesComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule, 
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [IndexService],
  bootstrap: [AppComponent]
})
export class AppModule { }
