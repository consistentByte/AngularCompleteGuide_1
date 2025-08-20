import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
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

  // get resultData() {
  //   //resultsData is a signal in service, so getter returns a signal
  //   return this.investmentService.resultsData;
  // }

  results = computed(() => this.investmentService.resultsData());

  // asReadOnly() is a method on signals to get a read only version of those signals
  // results = this.investmentService.resultsData.asReadonly();
}
