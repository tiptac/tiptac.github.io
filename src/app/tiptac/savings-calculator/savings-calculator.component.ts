import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  CurrentMonth,
  SavingsCalculatorService,
} from './savings-calculator.service';
import { SavingsChartModel } from './savings-chart/savings-chart.component';
import {
  CompoundInterval,
  Frequency,
  monthsInYear,
  SavingsCalculatorModel,
  TimeOption,
} from './savings-calculator.model';
import { environment } from 'src/environments/environment';
import { SavingsShareChartModel } from './savings-share-chart/savings-share-chart.component';

const savingsCalculatorKey = 'savingsCalculator';

@Component({
  selector: 'numbeo-savings-calculator',
  templateUrl: './savings-calculator.component.html',
  styleUrls: ['./savings-calculator.component.css'],
  providers: [SavingsCalculatorService],
})
export class SavingsCalculatorComponent implements OnInit, OnDestroy {
  private readonly debounceTime = 100;
  readonly defaultPricipal = 10000;
  readonly defaultRateOfInterest = 12;
  readonly defaultTime = 10;
  readonly principalMin = 1;
  readonly principalMax = 1000000000;
  readonly rateOfInterestMin = 0;
  readonly rateOfInterestMax = 100;
  readonly timeMin = 1;
  readonly investmentTimeMax = 60;
  readonly withdrawTimeMax = 60;
  readonly investmentTimeMaxMonths = this.investmentTimeMax * monthsInYear;
  readonly withdrawTimeMaxMonths = this.withdrawTimeMax * monthsInYear;

  readonly systematicWithdrawEnabled =
    environment.features.savingsCalculatorSystematicWithdraw;
  readonly systematicInvestmentEnabled =
    environment.features.savingsCalculatorSystematicInvestment;

  private readonly calculate$ = new Subject<void>();

  private _principal = this.defaultPricipal;
  public get principal(): number {
    return this._principal;
  }
  public set principal(value: number) {
    this._principal = value;
    this.calculate();
  }

  private _rateOfInterest = this.defaultRateOfInterest;
  public get rateOfInterest(): number {
    return this._rateOfInterest;
  }
  public set rateOfInterest(value: number) {
    this._rateOfInterest = value;
    this.calculate();
  }

  private _investmentTime = this.defaultTime;
  public get investmentTime(): number {
    return this._investmentTime;
  }
  public set investmentTime(value: number) {
    this._investmentTime = value;
    this.calculate();
  }

  public get investmentTimeInYear(): number {
    switch (this._investmentTimeOption) {
      case TimeOption.months:
        return this._investmentTime / monthsInYear;
      case TimeOption.years:
        return this._investmentTime;
    }
  }
  public get investmentTimeInMonths(): number {
    switch (this._investmentTimeOption) {
      case TimeOption.months:
        return this._investmentTime;
      case TimeOption.years:
        return this._investmentTime * monthsInYear;
    }
  }

  private _withdrawTime = this.defaultTime;
  public get withdrawTime(): number {
    return this._withdrawTime;
  }
  public set withdrawTime(value: number) {
    this._withdrawTime = value;
    this.calculate();
  }

  private _investmentTimeOption = TimeOption.years;
  public get investmentTimeOption() {
    return this._investmentTimeOption;
  }
  public set investmentTimeOption(value) {
    this._investmentTimeOption = value;
    this.investmentTimeOptionChange();
    this.calculate();
  }

  private _withdrawTimeOption = TimeOption.years;
  public get withdrawTimeOption() {
    return this._withdrawTimeOption;
  }
  public set withdrawTimeOption(value) {
    this._withdrawTimeOption = value;
    this.withdrawTimeOptionChange();
    this.calculate();
  }

  private _contributionType = this.systematicInvestmentEnabled
    ? Frequency.monthly
    : Frequency.onetime;
  public get contributionType() {
    return this._contributionType;
  }
  public set contributionType(value) {
    this._contributionType = value;
    this.calculate();
  }

  private _withdrawType = Frequency.monthly;
  public get withdrawType() {
    return this._withdrawType;
  }
  public set withdrawType(value) {
    this._withdrawType = value;
    if (
      this._withdrawType === Frequency.yearly &&
      this.withdrawTimeOption === TimeOption.months
    ) {
      this.withdrawTimeOption = TimeOption.years;
      return;
    }
    this.calculate();
  }

  private _compoundInterval = CompoundInterval.monthly;
  public get compoundInterval() {
    return this._compoundInterval;
  }
  public set compoundInterval(value) {
    this._compoundInterval = value;
    this.calculate();
  }

  private _amount = 0;
  public get amount() {
    return Math.round(this._amount);
  }
  public set amount(value: number) {
    this._amount = value;
  }

  private _balance = 0;
  public get balance() {
    return Math.round(this._balance);
  }
  public set balance(value: number) {
    this._balance = value;
  }

  lineChart: SavingsChartModel;
  pieChart: SavingsShareChartModel;

  TimeOption = TimeOption;
  Frequency = Frequency;
  CompoundInterval = CompoundInterval;

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private savingsCalculator: SavingsCalculatorService
  ) {}

  ngOnInit(): void {
    this.subscribeToCalculate();
    const queryParams = this.getQueryParams();
    const savedData = (this.getData() || {}) as object;
    const data: SavingsCalculatorModel = {
      ...savedData,
      ...queryParams,
    } as SavingsCalculatorModel;
    this.setData(data);
    this.calculate();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get investmentTimeOptionParameter() {
    switch (this.investmentTimeOption) {
      case TimeOption.months:
        return this.translateService.instant(
          'blog.savingsCalculator.time.option.months'
        );
      case TimeOption.years:
        return this.translateService.instant(
          'blog.savingsCalculator.time.option.years'
        );
    }
  }

  get withdrawTimeOptionParameter() {
    switch (this.withdrawTimeOption) {
      case TimeOption.months:
        return this.translateService.instant(
          'blog.savingsCalculator.time.option.months'
        );
      case TimeOption.years:
        return this.translateService.instant(
          'blog.savingsCalculator.time.option.years'
        );
    }
  }

  private subscribeToCalculate(): void {
    this.subscription.add(
      this.calculate$.pipe(debounceTime(this.debounceTime)).subscribe(() => {
        this.doCalculate();
      })
    );
  }

  private setData(data: SavingsCalculatorModel) {
    if (data.contributionType) {
      this._contributionType = data.contributionType;
    }
    if (data.principal) {
      this._principal = Number(data.principal);
    }
    if (data.rateOfInterest) {
      this._rateOfInterest = Number(data.rateOfInterest);
    }
    if (data.compoundInterval) {
      this._compoundInterval = data.compoundInterval;
    }
    if (data.investmentTimeOption) {
      this._investmentTimeOption = data.investmentTimeOption;
    }
    if (data.investmentTime) {
      this._investmentTime = Number(data.investmentTime);
    }
    if (data.withdrawType) {
      this._withdrawType = data.withdrawType;
    }
    if (data.withdrawTimeOption) {
      this._withdrawTimeOption = data.withdrawTimeOption;
    }
    if (data.withdrawTime) {
      this._withdrawTime = Number(data.withdrawTime);
    }
  }

  private investmentTimeOptionChange(): void {
    switch (this.investmentTimeOption) {
      case TimeOption.months:
        this.investmentTime = this.investmentTime * monthsInYear;
        break;
      case TimeOption.years:
        this.investmentTime = Math.round(this.investmentTime / monthsInYear);
        this.investmentTime = this.investmentTime || this.timeMin;
        break;
    }
  }
  private withdrawTimeOptionChange(): void {
    switch (this.withdrawTimeOption) {
      case TimeOption.months:
        this.withdrawTime = this.withdrawTime * monthsInYear;
        break;
      case TimeOption.years:
        this.withdrawTime = Math.round(this.withdrawTime / monthsInYear);
        this.withdrawTime = this.withdrawTime || this.timeMin;
        break;
    }
  }

  private calculate(): void {
    this.calculate$.next();
  }

  private doCalculate(): void {
    this.drawChart();

    const data: SavingsCalculatorModel = {
      contributionType: this.contributionType,
      principal: this.principal,
      rateOfInterest: this.rateOfInterest,
      compoundInterval: this.compoundInterval,
      investmentTime: this.investmentTime,
      withdrawType: this.withdrawType,
      withdrawTime: this.withdrawTime,
      investmentTimeOption: this.investmentTimeOption,
      withdrawTimeOption: this.withdrawTimeOption,
    };
    this.setQueryParams(data);
    this.saveData(data);
  }

  private setQueryParams(data: SavingsCalculatorModel): void {
    this.router.navigate([], {
      queryParams: data,
    });
  }

  private getQueryParams(): Params {
    return this.activatedRoute.snapshot.queryParams;
  }

  private saveData(data: SavingsCalculatorModel): void {
    localStorage.setItem(savingsCalculatorKey, JSON.stringify(data));
  }

  private getData(): SavingsCalculatorModel | undefined {
    const obj = localStorage.getItem(savingsCalculatorKey);
    if (obj) {
      return JSON.parse(obj);
    }
    return undefined;
  }

  private drawChart(): void {
    const result = this.savingsCalculator.calculate(
      this.contributionType,
      this.principal,
      this.rateOfInterest,
      this.investmentTimeInMonths,
      this.compoundInterval,
      this.withdrawType,
      this.withdrawTime
    );
    this.amount = result.amount;
    this.lineChart = {
      chartData: [
        {
          data: result.graph.map((v) => {
            return {
              x: v.monthIndex,
              y: v.investment,
            };
          }),
          label: this.translateService.instant(
            'blog.savingsCalculator.investment.label'
          ),
          fill: false,
        },
        {
          data: result.graph.map((v) => {
            return {
              x: v.monthIndex,
              y: v.cumulativeInterest,
            };
          }),
          label: this.translateService.instant(
            'blog.savingsCalculator.interest'
          ),
          fill: false,
        },

        {
          data: result.graph.map((v) => {
            return {
              x: v.monthIndex,
              y: v.balance,
            };
          }),
          label: this.translateService.instant('blog.savingsCalculator.total'),
          fill: false,
        },
      ],
      chartLabels: result.graph.map((v) => v.monthIndex.toString()),
      chartColors: [
        {
          backgroundColor: 'rgba(255, 0, 0, 1)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 0,
          pointRadius: 1,
        },
        {
          backgroundColor: 'rgba(0, 255, 0, 1)',
          borderColor: 'rgba(0, 255, 0, 1)',
          borderWidth: 0,
          pointRadius: 1,
        },
        {
          backgroundColor: 'rgba(0, 0, 255, 1)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 0,
          pointRadius: 1,
        },
      ],
    };
    this.pieChart = {
      chartData: [result.investment, result.interest],
      chartColors: [
        {
          backgroundColor: ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)'],
        },
      ],
      chartLabels: [
        this.translateService.instant(
          'blog.savingsCalculator.investment.label'
        ),
        this.translateService.instant('blog.savingsCalculator.interest'),
      ],
    };
  }
}
