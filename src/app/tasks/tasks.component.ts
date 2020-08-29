import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AtuhServiceService } from '../services/atuh-service.service';
import * as moment from 'moment';
import { ModalComponent } from '../shared/modal/modal.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TaskServiceService } from '../services/task-service.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  myPrioryties= [
    { value: 1,  name: "Baja" },
    { value: 2, name: "Media" },
    { value: 3,  name: "Alta" }
  ];

  tasks = [];
  regularDistribution = 25;

  constructor(private router:Router,
    public dialog: MatDialog,
    private taskservice: TaskServiceService,
    private authService: AtuhServiceService,
    private _snackBar: MatSnackBar) {
    let token = (localStorage.getItem('token')) ? localStorage.getItem('token') : null;
    if(token === null ){
      this.router.navigate(['/login']);
    }
    this.getData();
  }

  ngOnInit() {
  }

  getData(){
    this.taskservice.getTasks().subscribe(
        (data) => {
          this.tasks = data;
        },
        (error) => {
          console.log(error);
        }
    );
  }

  openDialog(type, data) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '430px',
       data: { type: type, info: data }
      });

    let meessage = (type === 'register') ?
      'Se ha registrado la tarea correctamente' :
      'Se ha actualizado la tarea correctamente';

    const sub = dialogRef.componentInstance.onAdd.subscribe(() => {
      // do something
       this.getData();
       dialogRef.close();
       this._snackBar.open(meessage, "aceptar", {
        duration: 5000,
      });

    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deleteTaks(data): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: {type: 'delete'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'true'){
         this.taskservice.deleteTask(data).subscribe(
            (data) => {

               this.getData();
               this._snackBar.open("Tarea eliminada correctamente", "aceptar", {
                duration: 5000,
              });
            },
            (error) => {
              console.log(error);
              this._snackBar.open("Ha ocurrido un error", "aceptar", {
                duration: 3000,
              });

            }
         );
      }
    });
  }

  closeSesion(){
    localStorage.removeItem('token');
     this.router.navigate(['/login']);
  }

}
