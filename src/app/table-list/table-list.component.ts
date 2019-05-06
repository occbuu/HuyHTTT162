import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  itemresults: any[];
  lst : Snort[];

  constructor(
    private route: ActivatedRoute,
    public http: HttpClient) { }

  ngOnInit() {
    //this.itemresults = ROUTES.filter(itemresult => itemresult);
    this.http.get("./assets/snortdata.json").subscribe(
      data => {
        this.lst = data as Snort [];	 // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrBirds[1]);
      },
    );
  }

}
