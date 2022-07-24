import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-sibling-a',
  templateUrl: './sibling-a.component.html',
  styleUrls: ['./sibling-a.component.scss']
})
export class SiblingAComponent implements OnInit {
  ipSend = "";

  constructor(private _interactionService: TransferService) { }

  ngOnInit(): void {
  }

  sendaMessage(msg: string) {
    this._interactionService.sendMessage(msg);
  }

  clearInput() {
    this.ipSend = "";
  }

}
