import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-view-child',
  templateUrl: './view-child.component.html',
  styleUrls: ['./view-child.component.scss']
})
export class ViewChildComponent implements AfterViewInit {

  @ViewChild(ChildComponent) ctChild: any;

  msg = "";
  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.msg = this.ctChild.message;
    this.cdr.detectChanges();
  }

}
