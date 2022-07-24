import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CrudAppComponent } from './crud-app/crud-app.component';
import { TutsComponent } from './tuts/tuts.component';
import { EventsComponent } from './tuts/events/events.component';
import { SiblingAComponent } from './tuts/transfer/sibling-a/sibling-a.component';
import { SiblingBComponent } from './tuts/transfer/sibling-b/sibling-b.component';
import { ViewChildComponent } from './tuts/view-child/view-child.component';
import { ChildComponent } from './tuts/view-child/child/child.component';
import { ToParentComponent } from './tuts/to-parent/to-parent.component';
import { Child2Component } from './tuts/to-parent/child2/child2.component';
import { DialogDetailComponent } from './dialog-detail/dialog-detail.component';
import { DialogPollsComponent } from './dialog-polls/dialog-polls.component';
import { DialogMapComponent } from './dialog-map/dialog-map.component';

import { GoogleMapsModule } from '@angular/google-maps';
@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    CrudAppComponent,
    TutsComponent,
    EventsComponent,
    SiblingAComponent,
    SiblingBComponent,
    ViewChildComponent,
    ChildComponent,
    ToParentComponent,
    Child2Component,
    DialogDetailComponent,
    DialogPollsComponent,
    DialogMapComponent,
  ],
  exports: [MatInputModule],
  imports: [
    MatDividerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
