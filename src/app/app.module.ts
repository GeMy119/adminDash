import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { AddVisitFormComponent } from './add-visit-form/add-visit-form.component';
import { VisitListComponent } from './visit-list/visit-list.component';
import { UpdateUserFormComponent } from './update-user-form/update-user-form.component'; // إضافة استيراد UpdateUserFormComponent
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    SponsorListComponent,
    SponsorFormComponent,
    AdminLoginComponent,
    RemoveTimePipe,
    UpdateUserFormComponent,
    UpdateSponsorFormComponent,
    AddWorkerFormComponent,
    HeaderComponent,
    AddVisitFormComponent,
    VisitListComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule, // Declare FormsModule in the imports array
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgbAccordionModule,
  ],
  providers: [
    SponsorService,
    SponsorFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
