import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tiptac-layout-blog-tile',
  templateUrl: './blog-tile.component.html',
  styleUrls: ['./blog-tile.component.css'],
})
export class BlogTileComponent implements OnInit {
  @Input() topic: string;
  @Input() title: string;
  @Input() link: string[];
  @Input() linkText: string;
  constructor() {}

  ngOnInit(): void {}
}
