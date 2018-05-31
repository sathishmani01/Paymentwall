import { Injectable,Output,EventEmitter } from '@angular/core';
import {Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class FlimServiceService {
  private apiUrl ='http://starlord.hackerearth.com/beercraft';
  @Output() fire:EventEmitter<any>=new EventEmitter();
  constructor(private http:Http) { 
    console.log('From Flim Service..')
  }
  
  getBeersData(){
    return this.http.get(this.apiUrl).map((res :Response) => res.json());
  }

  change(data)
   {
     console.log('service data'+JSON.stringify(data))
     this.fire.emit(data);
   }
  getEmittedValue()
   {
     return this.fire;
   }  

}

