import { Component, OnInit, Inject, EventEmitter, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  onAdd = new EventEmitter();
  info;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     this.info = this.data;
  }

  ngOnInit() {
  }

  getInfo(message){
    this.onAdd.emit(message);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
