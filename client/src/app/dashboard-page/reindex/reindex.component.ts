import { Component, NgIterable, OnInit } from '@angular/core';
import { ReindexService } from 'src/app/shared/reindex.service';
import { MatDialogRef } from '@angular/material/dialog';
import { IndexService } from 'src/app/shared/index.service';

@Component({
  selector: 'app-reindex',
  templateUrl: './reindex.component.html',
  styleUrls: ['./reindex.component.css']
})
export class ReindexComponent implements OnInit {

  constructor(public service: ReindexService, public indexService: IndexService, public dialogRef:MatDialogRef<ReindexComponent>) { }

  option;
  dis = [];
  checked:boolean = false;
  
  ngOnInit(): void {
    this.service.initializeFormGroup();
    this.indexService.getAllIndex().subscribe(
      data =>{
        this.option = data;
        for(let i = 0; i < this.option.length; i++){
          this.dis[i] = this.option[i].index.toString();
          //console.log(this.dis[i]);
        }
      });
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onReindex(){
    if(this.service.form.valid){
      if(this.checked){
        this.service.reIndexv2(this.service.form.value.destIndex, this.service.form.value.optSettings);
      }else{
        this.service.reIndex(this.service.form.value.destIndex);
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.dialogRef.close();
    }
  }

  checkB(completed: boolean){
    if(completed){
      this.checked = true;
      document.getElementById("sett").style.display = "block";
    }else{
      this.checked = false;
      document.getElementById("sett").style.display = "none";
    }
  }

}
