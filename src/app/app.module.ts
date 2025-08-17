import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent], // for importing non-standalone components
  imports: [BrowserModule, HeaderComponent, UserComponent, TasksComponent], // for importing other modules or importing any standalone component.
  bootstrap: [AppComponent], // if this module is used to bootstrap application then which components must be used to bootstrap,
})
export class AppModule {}
