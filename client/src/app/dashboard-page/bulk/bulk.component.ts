import { Component, OnInit } from '@angular/core';
import { ReindexService } from 'src/app/shared/reindex.service';
import { MatDialogRef } from '@angular/material/dialog';
import { IndexService } from 'src/app/shared/index.service';

@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.css']
})
export class BulkComponent implements OnInit {

  constructor(public service: ReindexService, public indexService: IndexService, public dialogRef:MatDialogRef<BulkComponent>) { }

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

  onBulk(){
    if(this.service.form.valid){
      if(this.checked){
        this.service.bulkReindexv2(this.service.form.value.destIndex, this.service.form.value.optSettings);
        //console.log(this.service.form.value.destIndex);
      }else{
        //console.log(this.service.form.value.destIndex);
        this.service.bulkReindex(this.service.form.value.destIndex);
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
