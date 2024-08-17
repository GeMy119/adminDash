import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { SponsorListComponent } from './sponsor-list/sponsor-list.component';
import { SponsorFormComponent } from './sponsor-form/sponsor-form.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from './auth.guard';
import { UpdateUserFormComponent } from './update-user-form/update-user-form.component';
import { UpdateSponsorFormComponent } from './update-sponsor-form/update-sponsor-form.component';
import { AddWorkerFormComponent } from './add-worker-form/add-worker-form.component';
import { AddVisitFormComponent } from './add-visit-form/add-visit-form.component';
import { VisitListComponent } from './visit-list/visit-list.component';
import { UpdateVisitComponent } from './update-visit/update-visit.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AdminLoginComponent },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'user-form', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'sponsor-list', component: SponsorListComponent, canActivate: [AuthGuard] },
  { path: 'sponsor-form', component: SponsorFormComponent, canActivate: [AuthGuard] },
  { path: 'update-user-form', component: UpdateUserFormComponent, canActivate: [AuthGuard] },
  { path: 'update-sponsor-form', component: UpdateSponsorFormComponent, canActivate: [AuthGuard] },
  { path: 'add-worker-form', component: AddWorkerFormComponent, canActivate: [AuthGuard] },
  { path: 'add-visit-form', component: AddVisitFormComponent, canActivate: [AuthGuard] },
  { path: 'visit-list', component: VisitListComponent, canActivate: [AuthGuard] },
  { path: 'update-visit', component: UpdateVisitComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
