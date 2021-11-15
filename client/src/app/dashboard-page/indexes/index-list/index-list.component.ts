import { Component, OnInit, ViewChild } from '@angular/core';
import { IndexService } from 'src/app/shared/index.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IndexComponent } from '../index/index.component';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-index-list',
  templateUrl: './index-list.component.html',
  styleUrls: ['./index-list.component.css']
})
export class IndexListComponent implements OnInit {

  constructor(private service: IndexService, private dialog:MatDialog,
    private dialogService: DialogService ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['check', 'name', 'numDocs', 'size', 'quickActions', 'type'];
  @ViewChild(MatSort) sort:MatSort;

  ngOnInit(): void {
    this.service.getAllIndex().subscribe(
      data =>{
        this.listData = new MatTableDataSource(<any>data);
        this.listData.sort = this.sort;
      });
  }

  onAddNew(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.height = "55%";
    this.dialog.open(IndexComponent, dialogConfig);
  }

  onDelete(indexName){
    if(confirm('are you sure you want to delete?')){
      this.service.deleteIndex(indexName);
    }

    //this.dialogService.openConfirmDialog();
    
  }
}
