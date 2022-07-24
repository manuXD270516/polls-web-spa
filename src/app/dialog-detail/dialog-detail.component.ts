import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.scss'],
})
export class DialogDetailComponent implements OnInit {
  pollster!: any;
  constructor(
    private _apiService: ApiService,
    private _dialogRef: MatDialogRef<DialogDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) {}

  ngOnInit(): void {
    let { id } = this.params;
    this.getDetailPollster(id);
  }

  getDetailPollster(id: number) {
    /* this._apiService.getPollsterById(id).subscribe((res) => {
      console.log(res);
    }); */

    this._apiService.getPollsterById(id).subscribe({
      next: (res: any) => {
        this.pollster = res;
        console.log(this.pollster);
      },
      error: (err) => {},
    });
  }
}
