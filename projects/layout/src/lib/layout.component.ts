import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tiptac-layout',
  templateUrl: 'layout.component.html',
  styles: [],
})
export class LayoutComponent implements OnInit {
  @Input() title: string;
  @Input() logo: string;
  @Input() brand: string;
  constructor() {}

  ngOnInit(): void {}
}
