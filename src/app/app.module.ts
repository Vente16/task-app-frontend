import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModalComponent } from './shared/modal/modal.component';
import { FormTaskComponent } from './components/form-task/form-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { HttpClientModule} from "@angular/common/http";
import { TasksComponent } from './tasks/tasks.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');


@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    FormTaskComponent,
    LoginComponent,
    SpinnerComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    DragDropModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [ModalComponent],
  providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
