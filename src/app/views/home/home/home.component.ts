import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void { 
    
  }

  quanping(){
    const dom=document.getElementById('dd');
    // console.log(dom?.requestFullscreen());
    dom?.requestFullscreen()
  }

}
