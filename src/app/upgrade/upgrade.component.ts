import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Snort {
  id: number;
  TimeSnort: String;
  IDSnort: number;
  Protocol: String;
  DataType: String;
  Size: number;
  Route: String;
  IPFrom: String;
  IPTo: String;
  WorkNo: String;
  PassStt: String;
  PortFrom: number;
  PortTo: number;
  LogTime: String;
  IP_From: String;
  IP_To: String;
  IpType: String;
  AlertMode: number;
  SamePort: number;
}

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  lst : Snort[];

  constructor(
    public http: HttpClient
  ) {}

  ngOnInit() {
    
  }

  show() {
    this.http.get("./assets/snortdata.json").subscribe(
      data => {
        this.lst = data as Snort [];	 // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrBirds[1]);
      },
    );
  }

}
