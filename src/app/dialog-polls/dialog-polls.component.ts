import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-polls',
  templateUrl: './dialog-polls.component.html',
  styleUrls: ['./dialog-polls.component.scss'],
})
export class DialogPollsComponent implements OnInit {
  pollsterFullName: String = '';
  displayedColumns: string[] = [
    'ID',
    'NombreCompleto',
    'FechaNacimiento',
    'Direccion',
    'Preg#01',
    'Preg#02',
    'Preg#03',
    'Preg#04',
    'Accion',
  ];
  matTableDataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(
    private _apiService: ApiService,
    private _dialogRef: MatDialogRef<DialogPollsComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) {}

  ngOnInit(): void {
    let { id } = this.params;
    this.getPollsByPollsterId(id);
  }

  mapData(Polls: any[]): any[] {
    let pollsTransform: any = [];
    Polls.forEach((poll: any) => {
      let { Questions } = poll;
      let questionTransform: any = {};
      Questions.forEach((question: any, i: number) => {
        let { QuestionName, Answer } = question;
        questionTransform[`Question${i}`] = `${QuestionName} | ${Answer}`;
        //questionTransform[`Question${i}`] = Answer;
      });
      pollsTransform.push({ ...poll, ...questionTransform });
    });
    console.log(pollsTransform);
    return pollsTransform;
  }
  getPollsByPollsterId(id: number) {
    this._apiService.getPollsterById(id).subscribe({
      next: (res: any) => {
        let { Polls, Names, Lastnames } = res;
        let pollsTransform = this.mapData(Polls);
        this.pollsterFullName = `${Names} ${Lastnames}`;
        this.matTableDataSource = new MatTableDataSource(pollsTransform);
        this.matTableDataSource.paginator = this.matPaginator;
        this.matTableDataSource.sort = this.matSort;
      },
      error: (err) => {
        console.log('Error: ' + err);
      },
    });
  }

  playAudio(audioEncode: String) {
    console.log(audioEncode);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.matTableDataSource.filter = filterValue.trim().toLowerCase();

    if (this.matTableDataSource.paginator) {
      this.matTableDataSource.paginator.firstPage();
    }
  }
}
