import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  private investmentService = inject(InvestmentService);

  get resultData() {
    //resultsData is a signal in service.
    return this.investmentService.resultsData;
  }
}
