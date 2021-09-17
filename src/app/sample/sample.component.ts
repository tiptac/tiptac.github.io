import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'numbeo-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css'],
})
export class SampleComponent implements OnInit {
  title = 'numbeo';
  constructor() {}

  ngOnInit(): void {}
}
