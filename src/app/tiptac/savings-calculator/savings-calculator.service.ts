import { Injectable } from '@angular/core';
import {
  CompoundInterval,
  Frequency,
  monthsInYear,
} from './savings-calculator.model';

@Injectable({
  providedIn: 'root',
})
export class SavingsCalculatorService {
  constructor() {}

  calculate(
    contributionType: Frequency,
    investmentAmount: number,
    rateOfInterest: number,
    investmentTime: number,
    compoundInterval: CompoundInterval,
    withdrawType: Frequency,
    withdrawTime: number
  ): Result {
    let monthIndex = 1;
    let contribution = investmentAmount;
    let principal = contribution;
    let interest = this.calculateSimpleInterestPerMonth(
      contribution,
      rateOfInterest
    );
    let investment = contribution;
    let cumulativeInterest = interest;
    let balance = investment + cumulativeInterest;
    let year = this.getYear(monthIndex);
    let month = this.getMonth(monthIndex);
    let currentMonth: CurrentMonth = {
      monthIndex,
      year,
      month,
      contribution,
      investment,
      principal,
      interest,
      cumulativeInterest,
      balance,
    };
    const graph: CurrentMonth[] = [];
    graph.push(currentMonth);

    while (monthIndex < investmentTime) {
      monthIndex++;
      year = this.getYear(monthIndex);
      month = this.getMonth(monthIndex);
      switch (contributionType) {
        case Frequency.onetime:
          if (year === 1 && month === 1) {
            contribution = investmentAmount;
          } else {
            contribution = 0;
          }
          break;
        case Frequency.monthly:
          contribution = investmentAmount;
          break;
        case Frequency.yearly:
          if (month === 1) {
            contribution = investmentAmount;
          } else {
            contribution = 0;
          }
          break;
      }
      investment = currentMonth.investment + contribution;
      const prevCumulativeInterest = this.getCumulativeInterest(graph);

      switch (compoundInterval) {
        case CompoundInterval.never:
          principal = investment;
          break;
        case CompoundInterval.monthly:
          principal = investment + currentMonth.cumulativeInterest;
          break;
        case CompoundInterval.yearly:
          if (month === 1) {
            principal = investment + currentMonth.cumulativeInterest;
          } else {
            principal =
              investment +
              currentMonth.cumulativeInterest -
              (month - 1) * currentMonth.interest;
          }
          break;
      }
      interest = this.calculateSimpleInterestPerMonth(
        principal,
        rateOfInterest
      );
      cumulativeInterest = prevCumulativeInterest + interest;
      balance = investment + cumulativeInterest;
      currentMonth = {
        monthIndex,
        year: this.getYear(monthIndex),
        month: this.getMonth(monthIndex),
        contribution,
        investment,
        principal,
        interest,
        cumulativeInterest,
        balance,
      };

      graph.push(currentMonth);
    }

    const final = graph[graph.length - 1];
    const amount = final.balance;

    return {
      amount,
      investment: final.investment,
      interest: final.cumulativeInterest,
      graph,
    };
  }

  private getCumulativeInterest(previousMonths: CurrentMonth[]) {
    return previousMonths.reduce((prev, curr) => prev + curr.interest, 0);
  }

  private calculateSimpleInterestPerMonth(
    principal: number,
    rateOfInterest: number
  ) {
    return (principal * rateOfInterest) / monthsInYear / 100;
  }

  private getYear(monthIndex: number) {
    return Math.floor((monthIndex - 1) / monthsInYear) + 1;
  }

  private getMonth(monthIndex: number) {
    const mod = monthIndex % monthsInYear;
    return mod === 0 ? 12 : mod;
  }
}

export interface Result {
  amount: number;
  graph: CurrentMonth[];
  investment: number;
  interest: number;
}

export interface CurrentMonth {
  monthIndex: number;
  year: number;
  month: number;
  contribution: number;
  investment: number;
  principal: number;
  interest: number;
  cumulativeInterest: number;
  balance: number;
}
