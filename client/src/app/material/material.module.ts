import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {     MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule, 
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule 
  
  ],
  exports:[
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatCardModule,
  ]
})
export class MaterialModule { }
