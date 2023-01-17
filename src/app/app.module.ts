import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalComponent } from './modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CandidateModelComponent } from './candidate-model/candidate-model.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideModule } from 'ng-click-outside';
import { IgxDropDownModule } from 'igniteui-angular';
import { IgxButtonModule } from 'igniteui-angular';
import { MatSelectModule } from '@angular/material/select';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KanbanServiceService } from './kanban-service.service';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReportComponent } from './report/report.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LoginSuccessComponent,
    ModalComponent,
    CandidateModelComponent,
    SearchModalComponent,
    HomeComponent,
    NavbarComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    RouterModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    ClickOutsideModule,
    IgxDropDownModule,
    IgxButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatCardModule
  ],
  providers: [KanbanServiceService],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule {
}
