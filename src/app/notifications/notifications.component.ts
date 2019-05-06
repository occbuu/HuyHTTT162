import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

declare var $: any;

declare interface result {
  Id: number;
  Type: string;
  Content: string;
  Time: string;
  Status: string;
}

export const ROUTES: result[] = [
  { Id: 1, Type: 'Thông báo', Content: '1 thiết bị gia nhập hệ thống', Time: '04/12/2018', Status: 'Đã gửi' },
  { Id: 2, Type: 'Nhắc nhở', Content: 'Sắp hết băng thông', Time: '05/12/2018', Status: 'Đã xem' },
  { Id: 3, Type: 'Cảnh báo', Content: '1 thiết bị ngoài vùng gia nhập hệ thống', Time: '06/12/2018', Status: 'Đã gửi' },
  { Id: 4, Type: 'Báo động', Content: 'Hệ thống mạng đang bị tấn công', Time: '07/12/2018', Status: 'Đã gửi' },
  { Id: 5, Type: 'Thông báo', Content: '1 thiết bị gia nhập hệ thống', Time: '08/12/2018', Status: 'Đã gửi' },
];

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  itemresults: any[];
  public screen: any;
  constructor(private route: ActivatedRoute) { }
  showNotification(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "notifications",
      message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

    }, {
        type: type[color],
        timer: 4000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }
  ngOnInit() {
    this.route.queryParams
      .filter(params => params.screen)
      .subscribe(params => {
        this.screen = params.screen;
      });
    this.itemresults = ROUTES.filter(itemresult => itemresult);
  }

}
