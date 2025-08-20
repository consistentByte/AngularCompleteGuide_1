import { NgModule } from '@angular/core';
import { AppComponent } from './app/app.component';
import { HeaderComponent } from './app/header/header.component';
import { InvestmentResultsComponent } from './app/investment-results/investment-results.component';
import { BrowserModule } from '@angular/platform-browser';
import { UserInputModule } from './app/user-input/user.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, InvestmentResultsComponent],
  imports: [BrowserModule, UserInputModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
