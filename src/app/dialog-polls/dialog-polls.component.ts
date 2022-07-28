import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-dialog-polls',
  templateUrl: './dialog-polls.component.html',
  styleUrls: ['./dialog-polls.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DialogPollsComponent implements OnInit {
  pollsterFullName: String = '';
  audio: HTMLAudioElement = new Audio();
  displayedColumns: string[] = [
    'ID',
    'NombreCompleto',
    'FechaNacimiento',
    'Direccion',
    /*  'Preg#01',
    'Preg#02',
    'Preg#03',
    'Preg#04', */
    'Audio',
  ];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: any | null;
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

  isAudioPlayed() {
    return this.audio.paused;
  }
  isQuestionField(item: { [key: string]: any }): boolean {
    return `${item['key']}`.includes('Question');
  }

  getQuestion(questionAnswerValue: string | any): string {
    return `${questionAnswerValue}`.split('|')[0];
  }

  getAnswer(questionAnswerValue: string | any): string {
    return `${questionAnswerValue}`.split('|')[1];
  }
  mapData(Polls: any[]): any[] {
    let pollsTransform: any = [];
    Polls.forEach((poll: any) => {
      let { Questions } = poll;
      delete poll.Questions;
      let questionTransform: any = {};
      Questions.forEach((question: any, i: number) => {
        let { QuestionName, Answer } = question;
        questionTransform[`Question${i}`] = `${QuestionName} | ${Answer}`;
        //questionTransform[`Question${i}`] = Answer;
      });

      pollsTransform.push({ ...poll, ...questionTransform });
    });
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
    if (this.audio.paused) {
      this.audio.src = `${this._apiService.publicUrl}${audioEncode}`;
      this.audio.load();
      this.audio.play();
      console.log(this.audio.paused);
    } else {
      this.audio.pause();
    }

    /* setTimeout(() => {
      console.log(audio);
    }, 5000); */
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.matTableDataSource.filter = filterValue.trim().toLowerCase();

    if (this.matTableDataSource.paginator) {
      this.matTableDataSource.paginator.firstPage();
    }
  }
}
