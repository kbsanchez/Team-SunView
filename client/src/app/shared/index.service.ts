import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor() { }

  form : FormGroup = new FormGroup({
    $key: new FormControl(null),
    indexName: new FormControl('', Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      indexName: ''
    });  
  }
}
