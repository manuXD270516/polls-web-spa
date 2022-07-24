import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-parent',
  templateUrl: './to-parent.component.html',
  styleUrls: ['./to-parent.component.scss']
})
export class ToParentComponent implements OnInit {

  message: string = "Not Received";

  constructor() { }

  ngOnInit(): void {
  }

  receiveMessage($event: any) {
    this.message = $event;

    console.log(this.message);
  }

}
