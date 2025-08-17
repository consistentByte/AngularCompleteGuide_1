import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';
import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from './shared/card/card.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { TaskComponent } from './tasks/task/task.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    TasksComponent,
    NewTaskComponent,
    TaskComponent,
  ], // for importing non-standalone components
  imports: [BrowserModule, FormsModule, SharedModule], // for importing other modules or importing any standalone component.
  bootstrap: [AppComponent], // if this module is used to bootstrap application then which components must be used to bootstrap,
})
export class AppModule {}
