import { Component, OnInit } from '@angular/core';
import { RisService } from '../shared/ris.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { IndexService } from 'src/app/shared/index.service';

@Component({
  selector: 'app-rispage',
  templateUrl: './rispage.component.html',
  styleUrls: ['./rispage.component.css']
})
export class RISPageComponent implements OnInit {

  constructor(public service: RisService, public indexService: IndexService, public NotificationService: NotificationService) { }

  option;
  dis = [];

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

  selected: Date | null;

  onSelected(a){
    this.selected = a;
    document.getElementById("date").innerHTML = "Selected Date: " + this.selected.toDateString();
  }
  
  onSubmit(){
    if(this.selected != null && this.service.form.valid){
      this.service.scheduleReindex(this.selected, 
        this.service.form.value.time, 
        this.service.form.value.source,
        this.service.form.value.dest
      );
      this.NotificationService.success("Successfully Scheduled");
    }else{      
      this.NotificationService.delete("Please fill out all the Forms");
      //window.location.reload();
    }
  }

}
