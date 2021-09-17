export enum Frequency {
  onetime = 'OneTime',
  monthly = 'Monthly',
  yearly = 'Yearly',
}

export enum CompoundInterval {
  never = 'OneTime',
  monthly = 'Monthly',
  yearly = 'Yearly',
}

export enum TimeOption {
  months = 'Months',
  years = 'Years',
}

export interface SavingsCalculatorModel {
  contributionType: Frequency;
  principal: number;
  rateOfInterest: number;
  compoundInterval: CompoundInterval;
  investmentTime: number;
  withdrawType: Frequency;
  withdrawTime: number;
  investmentTimeOption: TimeOption;
  withdrawTimeOption: TimeOption;
}

export const monthsInYear = 12;
