import { Component, OnInit } from '@angular/core';
import { IndexService } from 'src/app/shared/index.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public service: IndexService, public dialogRef:MatDialogRef<IndexComponent>) { }

  ngOnInit(): void {
    this.service.getAllIndex();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if(this.service.form.valid){
      if(this.checked){
        this.service.insertIndexv2(this.service.form.value.indexName, this.service.form.value.optSettings);
      }else{
        this.service.insertIndex(this.service.form.value.indexName);
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset;
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  checked:boolean = false;

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
