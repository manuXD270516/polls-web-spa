import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private _interactionMsgService = new Subject<string>();
  interactionMsg$ = this._interactionMsgService.asObservable();

  constructor() { }

  sendMessage(message: string) {
    this._interactionMsgService.next(message);
  }
}
