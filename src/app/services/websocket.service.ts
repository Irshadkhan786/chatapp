import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Websocket {
  socket:any;
  socketurl:string = "http://localhost:5000/";

  
  constructor() {
    this.socket = io(this.socketurl)
   }
  
  listen(eventname:string){
    return new Observable((subscriber)=>{
      this.socket.on(eventname,(data)=>{
        subscriber.next(data)
      })
    })
  }
  emit(eventname:string,data:any){
    this.socket.emit(eventname,data)
  }
}