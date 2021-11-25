import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RisService {

  constructor(private httpClient: HttpClient) { }

  form : FormGroup = new FormGroup({
    time: new FormControl('', Validators.required ),
    source: new FormControl('', Validators.required ),
    dest: new FormControl('', Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      time: '',
      source:'',
      dest:''
    });  
  }

  scheduleReindex(date, time, source, dest){
    //console.log(date+"\n"+time+"\n"+source+"\n"+dest);
    const endpointURL = 'http://localhost:5000/api/scheduler';
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    var body = 
    `{
      "scheduledJob": {
          "dayOfWeek":` + date.getDay() +`,
          "month": ` + (date.getMonth()+1) +`,
          "dayOfMonth": ` + date.getDate() +`,
          "hour": "` + time.slice(0,2) +`",
          "minute":"` + time.slice(3,5) +`",
          "source": "` + source +`",
          "dest": "` + dest +`"
      }
    }`;

    var json = JSON.parse(body);
    //console.log(json);

    this.httpClient.post(endpointURL, json).subscribe(
      (response) => {
        console.log(response);
        //window.location.reload()
        return response;
      }, (err)=>{
        console.log(err);
      }
    )

  }

}
