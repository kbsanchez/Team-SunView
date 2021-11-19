import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IndexService } from 'src/app/shared/index.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IndexComponent } from '../index/index.component';
import { DialogService } from 'src/app/shared/dialog.service';
import { ReindexComponent } from '../../reindex/reindex.component';
import { ReindexService } from 'src/app/shared/reindex.service';
import { BulkComponent } from '../../bulk/bulk.component';

@Component({
  selector: 'app-index-list',
  templateUrl: './index-list.component.html',
  styleUrls: ['./index-list.component.css']
})
export class IndexListComponent implements OnInit {

  constructor(private service: IndexService,private reservice: ReindexService, private dialog:MatDialog,
    private dialogService: DialogService, private changeDetectorRefs: ChangeDetectorRef ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['check', 'name', 'numDocs', 'size', 'quickActions', 'type'];
  @ViewChild(MatSort) sort:MatSort;

  ngOnInit(): void {
    this.createTable();
  }

  createTable(){
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

  onReindex(name){
    //console.log("ghjkknbvfdrt");
    this.reservice.initCurIndex(name);
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    //dialogConfig.height = "30%";
    this.dialog.open(ReindexComponent, dialogConfig);
  }

  onDelete(indexName){
    if(this.selectedIndexes.length > 0){
      if(confirm('are you sure you want to delete?')){
        this.service.deleteIndex(indexName);
      }
      window.location.reload()
    }
    //this.dialogService.openConfirmDialog();
  }

  selectedIndexes = [];

  onCheckBox(index){
    this.selectedIndexes.push(index);
  }

  bulkActions(sel){
    if(sel == "1"){
      if(confirm('are you sure you want to delete?')){
       this.service.deleteMultiple(this.selectedIndexes);
       window.location.reload()
      }
    }
  }

  onBulk(){
    if(this.selectedIndexes.length > 0){
      this.service.initializeFormGroup();
      this.reservice.receiveData(this.selectedIndexes);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = "30%";
      //dialogConfig.height = "30%";
      this.dialog.open(BulkComponent, dialogConfig);
    }
  }

}
