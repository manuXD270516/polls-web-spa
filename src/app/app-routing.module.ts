import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CrudAppComponent } from './crud-app/crud-app.component';
import { AuthGuard } from './guards/auth.guard';
import { EventsComponent } from './tuts/events/events.component';
import { ToParentComponent } from './tuts/to-parent/to-parent.component';
import { SiblingAComponent } from './tuts/transfer/sibling-a/sibling-a.component';
import { TutsComponent } from './tuts/tuts.component';
import { ViewChildComponent } from './tuts/view-child/view-child.component';

const routes: Routes = [
  { path: '', component: CrudAppComponent, canActivate: [AuthGuard] },
  { path: 'pollsters', component: CrudAppComponent, canActivate: [AuthGuard] },
  { path: 'auth/login', component: AuthComponent },
];
/* {
    path: 'tuts',
    component: TutsComponent,
    children: [
      { path: 'events', component: EventsComponent },
      { path: 'transfer', component: SiblingAComponent },
      { path: 'view-child', component: ViewChildComponent },
      { path: 'to-parent', component: ToParentComponent },
    ],
  },/
];*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
