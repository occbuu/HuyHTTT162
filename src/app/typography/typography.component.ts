import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  itemresults: any[];
  lst : any[];

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.http.get("./assets/snortdata.json").subscribe(
      data => {
        this.lst = data as any [];	 // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrBirds[1]);
      },
    );
  }

}
