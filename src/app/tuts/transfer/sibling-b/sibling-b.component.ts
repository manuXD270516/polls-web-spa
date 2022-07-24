import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-sibling-b',
  templateUrl: './sibling-b.component.html',
  styleUrls: ['./sibling-b.component.scss']
})
export class SiblingBComponent implements OnInit {

  getMsg: string = "";

  constructor(private _interactiveMsgService: TransferService) { }

  ngOnInit(): void {
    this.getMessage();
  }

  getMessage() {
    this._interactiveMsgService.interactionMsg$.subscribe({
      next: (res) => {
        this.getMsg = res;
      }
    });
  }

}
