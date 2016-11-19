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
  public imagePath: string;

  ngOnInit(): void {
    ipcRenderer.on('reply', (event, arg) => {
      console.log("Reply: " + arg); // prints "pong"
    });

    ipcRenderer.on('selected-image-file', (event, path) => this.selectImageFile(path));
    // ipcRenderer.on('selected-image-file', function (event, path) {
    //   this.selectImageFile(path);
    // });
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

  public openImageFileSelect(): void {
    ipcRenderer.send('open-image-file');
  }

  private selectImageFile(path: string): void {
    this.imagePath = path;
    let snackBarRef = this.snackBar.open(`Selected path: ${path}`, null, new MdSnackBarConfig());
    setTimeout(() => snackBarRef.dismiss(), 5000);
  }

}
