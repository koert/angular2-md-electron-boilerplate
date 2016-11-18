import { Component } from '@angular/core';
import { MdToolbar } from '@angular/material';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';

const ipcRenderer = require('electron').ipcRenderer;

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {


  constructor(public snackBar: MdSnackBar) {
    ipcRenderer.on("reply", (event, arg) => {
      console.log("Reply was " + arg);
    });
  }

  public title: string = "Hello Angular 2!";
  public message: string = "Greatness awaits..."

  public test(): void {
    console.log("Getestet");
    ipcRenderer.send("message", "tested");

    let config = new MdSnackBarConfig();
    // config.duration = 0;
    this.snackBar.open(this.message, null, config);
  }

}
