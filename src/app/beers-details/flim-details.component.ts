import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FlimServiceService } from '../service/flim-service.service'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as alasql from 'alasql';


@Component({
  selector: 'app-flim-details',
  templateUrl: './flim-details.component.html',
  styleUrls: ['./flim-details.component.css']
})
export class BeersDetailsComponent implements OnInit {



  private orderOptionList: SelectItem[];
  private platformOptionList: SelectItem[];
  beersDetailsArray:Array<object>=[];
  tempgameDetailsArray:Array<object>=[];
  loadSaveSpinner:boolean=true;
  beersSearch:string;
  beersArray:any;
  currentPage: Number;
  searchResultsPerPage: Number;
  searchText:string;
  cartDeatilsArray:any;
  closeModel:boolean=false;

  constructor(private flimServices:FlimServiceService) {
    this.tempgameDetailsArray=[];
    this.orderOptionList=[];
    this.platformOptionList=[];
    this.cartDeatilsArray=[];
    this.beersArray=[];
    this.currentPage = 1;
    this.searchResultsPerPage = 16;
   }

  ngOnInit() {
    this.loadFlimdata();
  }

  loadFlimdata() {
    this.flimServices.getBeersData().subscribe(data => {
      this.loadSaveSpinner=false;
      this.beersDetailsArray = data;
      this.tempgameDetailsArray=data;
      var queryresult=alasql('select DISTINCT style from ?',[data]);
      this.orderOptionList.push({ label:'Ascending', value: 'Ascending' },{label:'Descending', value: 'Descending'});
      for(let x of queryresult){
        this.platformOptionList.push({label:x.style,value:x.style});
      }
    })
  }

  selectSortType(event){
    if(event.value ==='Ascending'){
      var AscentData=alasql('SELECT * from ? order by abv ASC',[this.tempgameDetailsArray]);
      this.beersDetailsArray=AscentData;
    }else if(event.value ==='Descending'){
      var decentData=alasql('SELECT * from ? order by abv desc',[this.tempgameDetailsArray]);
      this.beersDetailsArray=decentData;
    }
   }
   selectStyleNameType(event){
    let platformArray=[];
    platformArray.push({'style':event.value});
    var queryresult=alasql('SELECT * from ? as a,? as b WHERE a.style=b.style',[this.tempgameDetailsArray,platformArray]);
    this.beersDetailsArray=queryresult;
   }
   searchGameNames(event){
     this.beersArray=this.tempgameDetailsArray.filter(item =>
      item['name'] && item['name'].toString().toLowerCase().indexOf(event.query.toString().toLowerCase()) != -1);
   }
   selectedGameName(event){
    this.beersDetailsArray=[];
    this.beersDetailsArray.push(event);
   }
   getbackData(event){
    this.beersDetailsArray=[];
    this.searchText='';
    this.beersSearch='';
    this.orderOptionList=[];
    this.platformOptionList=[];
    this.loadSaveSpinner=true;
     this.loadFlimdata();
   }

  //  Add to Cart Starts

  AddtoCart(item,idx){
    this.closeModel=false;
    this.cartDeatilsArray.unshift(item);
    let cartLength=this.cartDeatilsArray.length;
    this.flimServices.change({'cartLength':cartLength});
    
  }
  removeItemFromCart(item,idx){
    this.cartDeatilsArray.splice(idx,1);
    let cartLength=this.cartDeatilsArray.length;
    if(this.cartDeatilsArray.length==0){
      this.closeModel=true;
    }
    this.flimServices.change({'cartLength':cartLength});
  }

  AddRequestedQuantity(x,idx){
    x.reqquantity =isNaN(x.reqquantity)? 1:x.reqquantity +1;
  }
  removeRequestedQuantity(x,idx){
    if(x.reqquantity <=0){
      x.reqquantity=0
    }else{
      x.reqquantity =isNaN(x.reqquantity)? 1:x.reqquantity -1;
    }
  }
}

