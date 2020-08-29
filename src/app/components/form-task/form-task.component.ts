import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import * as moment from 'moment';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.css']
})
export class FormTaskComponent implements OnInit {

  myForm: FormGroup;
  myPrioryties= [
    { value: 1,  name: "Baja" },
    { value: 2, name: "Media" },
    { value: 3,  name: "Alta" }
  ];
  submitted = false;
  loading:boolean = false;
  error:boolean = false;

  @Output('emitmodal')
  emitmodal = new EventEmitter<string>();
  @Input('info') info;

  constructor(private fb: FormBuilder,
    private _adapter: DateAdapter<any>,
    private taskservice: TaskServiceService
    ) {
     this.createForm();
     this._adapter.setLocale('es');


   }

  createForm(){
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', []],
      priority: ['', [Validators.required]],
      dateExpired: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if(this.info.type === 'update'){
      let { info } = this.info;
      let description = (info.description) ?  info.description : '';
      this.myForm.controls['name'].setValue(info.name);
      this.myForm.controls['description'].setValue(description);
      this.myForm.controls['priority'].setValue(info.priority);
      this.myForm.controls['dateExpired'].setValue(info.dueDate);

    }
  }

  onSubmit() {
    this.submitted = true;
    let { valid } = this.myForm;
    let { dateExpired} = this.myForm.value;
    let data = this.myForm.value;
    this.error = false;
    data.dueDate = dateExpired;

    if(valid){
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        //this.error = true;
         if(this.info.type === 'register'){
          this.taskservice.saveTask(data).subscribe(
            (data) => {
               this.emitmodal.emit('emitiendo...');
              },
            (error) => {
              console.log(error);
              this.error = true;
            });
         }else{

          data._id = this.info.info._id;

          this.taskservice.updateTask(data).subscribe(
            (data) => {
               this.emitmodal.emit('emitiendo...');
              },
            (error) => {
              console.log(error);
              this.error = true;
            });
         }

      }, 2000);

    }
  }

}
