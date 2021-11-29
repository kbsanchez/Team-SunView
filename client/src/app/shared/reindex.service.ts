import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NotificationService } from 'src/app/shared/notification.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Injectable({
  providedIn: 'root'
})
export class ReindexService {

  constructor(private httpClient: HttpClient,public NotificationService: NotificationService) { }

  form : FormGroup = new FormGroup({
    destIndex: new FormControl('', Validators.required),
    optSettings: new FormControl('')
  });

  initializeFormGroup(){
    this.form.setValue({destIndex: '',
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

  currIndex;
  initCurIndex(name){
    this.currIndex = name;
  }

  reIndex(destIndex){
    //console.log(this.currIndex +"  uhdwbc  "+ destIndex);
    const endpointURL = 'http://localhost:5000/api/reindex/'+this.currIndex+'/'+destIndex;

    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');

    this.httpClient.post(endpointURL,"", {responseType: 'text'}).subscribe(
      (response) => {
        console.log(response);
        this.NotificationService.success("Succesfully Reindexed");
        window.location.reload()
        return response;
      }, (err)=>{
        console.log(err);
      }
    )
  }

  reIndexv2(destIndex, optSettings){
    //console.log(this.currIndex +"  uhdwbc  "+ destIndex +"  shdbn  " + optSettings);
    
    const endpointURL = 'http://localhost:5000/api/index/' + destIndex;
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    var json = JSON.parse(optSettings);
    console.log(json);

    this.httpClient.put(endpointURL, json).subscribe(
      (response) => {
        console.log(response);
        return response;
      }, (err)=>{
        console.log(err);
      }
    )

    const endpointURL1 = 'http://localhost:5000/api/reindex/'+this.currIndex+'/'+destIndex;

    this.httpClient.post(endpointURL1,"", {responseType: 'text'}).subscribe(
      (response) => {
        console.log(response);
        this.NotificationService.success("Succesfully Reindexed");
        window.location.reload()
        return response;
      }, (err)=>{
        console.log(err);
      }
    )
  }

  selectedIndexes = [];

  receiveData(list){
    for (let i = 0; i < list.length; i++){
      this.selectedIndexes.push(list[i]);
    }
  }

  // bulkReindex = destIndex => new Promise(resolve => {
  //   const httpHeaders = new HttpHeaders();
  //   httpHeaders.append('content-type', 'application/json');
  //   for (let i = 0; i < this.selectedIndexes.length; i++) {
  //     const endpointURL = 'http://localhost:5000/api/reindex/'+this.selectedIndexes[i]+'/'+destIndex;
  //     this.httpClient.post(endpointURL,"", {responseType: 'text'})
  //     .subscribe(response => console.log(response), err => console.log(err))
  //   }
  //   // resolve after for loop is done
  //   resolve(true)
  // })

  bulkReindex(destIndex){
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    for (let i = 0; i < this.selectedIndexes.length; i++){
      const endpointURL = 'http://localhost:5000/api/reindex/'+this.selectedIndexes[i]+'/'+destIndex;

      this.httpClient.post(endpointURL,"", {responseType: 'text'}).subscribe(
        (response) => {
          console.log(response);
          this.NotificationService.success(response);
        }, (err)=>{
          console.log(err);
        }
      )
    }
    this.NotificationService.success("Refresh page!");
  }

  bulkReindexv2(destIndex, optSettings){
    const endpointURL = 'http://localhost:5000/api/index/' + destIndex;
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    var json = JSON.parse(optSettings);

    this.httpClient.put(endpointURL, json).subscribe(
      (response) => {
        console.log(response);
      },(err)=>{
        console.log(err);
      }
    )

    for (let i = 0; i < this.selectedIndexes.length; i++){
      const endpointURL = 'http://localhost:5000/api/reindex/'+this.selectedIndexes[i]+'/'+ destIndex;

      this.httpClient.post(endpointURL,"", {responseType: 'text'}).subscribe(
        (response) => {
          console.log(response);
          this.NotificationService.success(response);
        }, (err)=>{
          console.log(err);
        }
      )
    }
    this.NotificationService.success("Refresh page!");
  }

}
