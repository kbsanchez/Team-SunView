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
    "config": {
        "settings": {
            "number_of_shards": 3,
            "number_of_replicas": 2
        },
        "indexType": "Article"
    }
}`
    });  
  }

  getAllIndex(){
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');

    return this.httpClient.get('http://localhost:5000/api/index');
  }

  insertIndex(indexName){

    const endpointURL = 'http://localhost:5000/api/index/' + indexName;
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');

    var optSettings = 
    `{
      "config": {
          "settings": {
          },
          "indexType": "Article"
      }
    }`
    var json = JSON.parse(optSettings);

    
    this.httpClient.put(endpointURL, json).subscribe(
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

  insertIndexv2(indexName, optSettings){

    const endpointURL = 'http://localhost:5000/api/index/' + indexName;
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    var json = JSON.parse(optSettings);
    //console.log(json);

    this.httpClient.put(endpointURL, json).subscribe(
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
    //console.log(endPointURL);

    this.httpClient.delete(endPointURL, {}).subscribe(
      (response) => {
        console.log(response);
        this.NotificationService.delete("Deleted Successfully!");
        return response;
      }, (err)=>{
        console.log(err);
      }
    )
  }

  deleteMultiple(indexList:any){
    for (let i = 0; i < indexList.length; i++){
      this.deleteIndex(indexList[i]);
    }
  }
  
}
