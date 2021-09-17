import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tiptac-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() logo: string;
  @Input() brand: string;

  constructor() {}

  ngOnInit(): void {}
}
