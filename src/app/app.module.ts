import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SponsorListComponent } from './sponsor-list/sponsor-list.component';
import { SponsorFormComponent } from './sponsor-form/sponsor-form.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule here
import { HttpClientModule } from '@angular/common/http';
import { RemoveTimePipe } from './pipes/remove-time.pipe';
import { SponsorService } from './sponsor-list/services/sponsor.service';
import { SponsorFormService } from './sponsor-form/services/sponsor-form.service';
import { UpdateSponsorFormComponent } from './update-sponsor-form/update-sponsor-form.component';
import { AddWorkerFormComponent } from './add-worker-form/add-worker-form.component';
import { HeaderComponent } from './header/header.component'; // تأكد من مسار الاستيراد الصحيح
import { NgxPaginationModule } from 'ngx-pagination';
import { AddVisitFormComponent } from './add-visit-form/add-visit-form.component';
import { VisitListComponent } from './visit-list/visit-list.component';
import { UpdateUserFormComponent } from './update-user-form/update-user-form.component'; // إضافة استيراد UpdateUserFormComponent

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    SponsorListComponent,
    SponsorFormComponent,
    AdminLoginComponent,
    RemoveTimePipe,
    UpdateUserFormComponent, // تأكد من إضافة UpdateUserFormComponent
    UpdateSponsorFormComponent,
    AddWorkerFormComponent,
    HeaderComponent, // تأكد من إضافة HeaderComponent
    AddVisitFormComponent,
    VisitListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // Declare FormsModule in the imports array
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    SponsorService,
    SponsorFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
