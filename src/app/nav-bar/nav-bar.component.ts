import { Component, OnInit } from '@angular/core';
import { FlimServiceService } from '../service/flim-service.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  cartCount:number;
  constructor(private cartLengthService:FlimServiceService) { }

  ngOnInit() {
    this.cartLengthService.getEmittedValue().subscribe(item => {
      console.log('Getting Length:: '+JSON.stringify(item.cartLength))
      this.cartCount = item.cartLength;
    });
  }
  
}
