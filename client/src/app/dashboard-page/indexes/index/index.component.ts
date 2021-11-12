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
      this.service.insertIndex(this.service.form.value.indexName, this.service.form.value.optSettings);
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

}
