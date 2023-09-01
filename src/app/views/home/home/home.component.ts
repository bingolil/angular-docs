import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  value = `function hello() {
	alert('Hello world!');
}`;
  constructor() {}

  ngOnInit(): void {}
}
