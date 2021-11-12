import { Component, OnInit } from '@angular/core';
import { TsqService } from '../shared/tsq.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-tsqpage',
  templateUrl: './tsqpage.component.html',
  styleUrls: ['./tsqpage.component.css']
})
export class TSQPageComponent implements OnInit {

  constructor(public tsqService: TsqService,public NotificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onClear() {
    this.tsqService.form.reset();
    this.tsqService.initializeFormGroup();
  }

  jsonData:any;

  onSubmit(){
    if(this.tsqService.form.valid){
      this.tsqService.getData(
        this.tsqService.form.value.indexName,
        this.tsqService.form.value.documentName, 
        this.tsqService.form.value.keyID, 
        this.tsqService.form.value.valueID ).subscribe(
        (response) => {
          //console.log(response);
          this.jsonData = response;
          document.getElementById("output").style.display="block";
        }, (err)=>{
          this.NotificationService.delete("Couldn't find the requested data!");
          console.log(err);
        }
      );
      this.tsqService.form.reset();
      this.tsqService.initializeFormGroup();
      this.onClose();
    }
  }

  onClose(){
    this.tsqService.form.reset;
    this.tsqService.initializeFormGroup();
  }

  syntaxHighlight(json) {
    json = json.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.toString().replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}



}
