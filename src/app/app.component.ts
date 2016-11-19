import { Component, OnInit } from '@angular/core';
import { MdToolbar } from '@angular/material';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {MdLiveAnnouncer} from '@angular/material';

const ipcRenderer = require('electron').ipcRenderer;

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private snackBar: MdSnackBar, private live: MdLiveAnnouncer) {
  }

  public title: string = "Hello Angular 2!";
  public message: string = "Greatness awaits..."

  ngOnInit(): void {
    ipcRenderer.on('reply', (event, arg) => {
      console.log("Reply: " + arg); // prints "pong"
    })
  }

  public test(): void {
    console.log("Getestet");
    ipcRenderer.send("message", "tested");

    let config = new MdSnackBarConfig();
    // config.duration = 0;
    let snackBar = this.snackBar.open(this.message, null, config);
    setTimeout(() => { snackBar.dismiss(); }, 5000);
  }

  public announce(): void {
    this.live.announce(this.message);
  }

}
