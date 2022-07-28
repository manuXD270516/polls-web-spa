import { Injectable, EventEmitter } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  socket: any;
  //readonly urlSocket: string = 'http://localhost:3005';
  readonly urlSocket: string = 'http://54.232.23.102:3006';
  constructor() {
    this.socket = io(this.urlSocket, {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
  }

  listen(eventName: String) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
