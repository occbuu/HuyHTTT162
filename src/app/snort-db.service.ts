import { Injectable } from '@angular/core';
//import TAFFY from 'taffy'

@Injectable()
export class SnortDbService {
  snortData:any;

  
  constructor(

  ) { 
    this.loadSnortData().then((result) => {
      //let TAFFY = require( 'taffy' ).taffy;
      //console.log(result)
      this.snortData = result;
    })
  }

  loadSnortData(): Promise<any> {
    return new Promise((resolve) => {
      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      console.log("OK 1")
      xobj.open('GET', 'assets/snortdata.json', true);
      xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == 200) {
          resolve(xobj.responseText);
        }
      };
      xobj.send(null);
    })
  }

  findMultiObjects(dataList: Array<{}>): Promise<any> {
    return new Promise((resolve) => {
      var wl = [];
      dataList.forEach(word => {
        wl.push(this.snortData({ word: word }).first())
      });
      resolve(wl)
    })
  }

  findOneObject(word: string) {
    var fword = this.snortData({ word: word }).first()
    return fword;
  }

}
