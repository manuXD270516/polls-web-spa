import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.scss'],
})
export class DialogDetailComponent implements OnInit {
  constructor(
    private _apiService: ApiService,
    private _dialogRef: MatDialogRef<DialogDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) {}

  ngOnInit(): void {
    console.log(this.params);
    //this.getDetailPollster();
  }

  getDetailPollster(id: number) {
    this._apiService.getPollsterById(2).subscribe((res) => {
      console.log(res);
    });
  }
}
