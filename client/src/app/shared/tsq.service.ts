import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TsqService {

  constructor(private httpClient: HttpClient) { }

  form : FormGroup = new FormGroup({
    indexName: new FormControl(''),
    documentName: new FormControl('' ),
    keyID: new FormControl('' ),
    valueID: new FormControl('')
  });

  initializeFormGroup(){
    this.form.setValue({
      indexName: '',
      documentName: '',
      keyID:'',
      valueID:''
    });  
  }
  
  getData(index: string, document: string, kkk: string, vvv: string){

    const endpointURL = 'http://localhost:5000/api/explain/'+index+'/'+document;
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    var temp = '{"query" : {"match" : { "'+kkk+'" : "'+vvv+'" }}}';
    console.log(JSON.parse(temp));
    return this.httpClient.post(endpointURL,JSON.parse(temp));
  }
}
