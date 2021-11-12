import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NotificationService } from 'src/app/shared/notification.service';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(private httpClient: HttpClient,public NotificationService: NotificationService) { }

  form : FormGroup = new FormGroup({
    indexName: new FormControl('', Validators.required),
    optSettings: new FormControl('')
  });

  initializeFormGroup(){
    this.form.setValue({
      indexName: '',
      optSettings:
`{
  "settings": {
      "index": {
        "number_of_shards": 3,
        "number_of_replicas": 2 
      }
  }
}`
    });  
  }

  getAllIndex(){
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');

    return this.httpClient.get('http://localhost:5000/api/index');
  }

  insertIndex(indexName, optSettings){

    const endpointURL = 'http://localhost:5000/api/index/' + indexName;
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    console.log(optSettings);

    this.httpClient.put(endpointURL, {
      "settings": {
          "index": {
          "number_of_shards": 3,
          "number_of_replicas": 2 
          }
      }
  }).subscribe(
      (response) => {
        console.log(response);
        this.NotificationService.success("Succ");
        window.location.reload()
        return response;
      }, (err)=>{
        console.log(err);
      }
    )
  }
  
  deleteIndex(indexName){
    const endPointURL = 'http://localhost:5000/api/index/' + indexName;
    console.log(endPointURL);

    this.httpClient.delete(endPointURL, {}).subscribe(
      (response) => {
        console.log(response);
        this.NotificationService.delete("Deleted Successfully!");
        window.location.reload()
        return response;
      }, (err)=>{
        console.log(err);
      }
    )
  }




}
