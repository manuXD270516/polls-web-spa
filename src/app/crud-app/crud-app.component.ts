import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { DialogDetailComponent } from '../dialog-detail/dialog-detail.component';
import { DialogPollsComponent } from '../dialog-polls/dialog-polls.component';
import { DialogMapComponent } from '../dialog-map/dialog-map.component';

@Component({
  selector: 'app-crud-app',
  templateUrl: './crud-app.component.html',
  styleUrls: ['./crud-app.component.scss'],
})
export class CrudAppComponent implements OnInit {
  //displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  displayedColumns: string[] = [
    'ID',
    'CI',
    'Nombres',
    'Apellidos',
    'Email',
    'Telefono',
    'Sexo',
    'Direccion',
    'Accion',
  ];
  matTableDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private _dialog: MatDialog, private _apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllPollsters();
  }

  getAllPollsters() {
    this._apiService.getAllPollster().subscribe({
      next: (res: any) => {
        this.matTableDataSource = new MatTableDataSource(res);
        this.matTableDataSource.paginator = this.matPaginator;
        this.matTableDataSource.sort = this.matSort;
      },
      error: (err) => {
        console.log('Error: ' + err);
      },
    });
  }

  editProduct(row: any) {
    this._dialog
      .open(DialogComponent, {
        width: '40%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllPollsters();
        }
      });
  }

  openDialog() {
    const dialogRef = this._dialog
      .open(DialogComponent, {
        width: '40%',
      })
      .afterClosed()
      .subscribe((val) => {
        console.log(val);
        if (val === 'save') {
          this.getAllPollsters();
        }
      });
  }

  openDetailDialog(id: number) {
    const dialogRef = this._dialog
      .open(DialogDetailComponent, {
        width: '60%',
        height: '88%',
        data: { id },
      })
      .afterClosed()
      .subscribe((val) => {
        console.log(val);
      });
  }

  openPollsDialog(id: number) {
    const dialogRef = this._dialog
      .open(DialogPollsComponent, {
        width: '90%',
        height: '90%',
        data: { id },
      })
      .afterClosed()
      .subscribe((val) => {
        //console.log(val);
      });
  }

  openMapDialog(id: number) {
    const dialogRef = this._dialog
      .open(DialogMapComponent, {
        width: '90%',
        height: '90%',
        data: { id },
      })
      .afterClosed()
      .subscribe((val) => {
        //console.log(val);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.matTableDataSource.filter = filterValue.trim().toLowerCase();

    if (this.matTableDataSource.paginator) {
      this.matTableDataSource.paginator.firstPage();
    }
  }
}
