import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    show: boolean;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Trang chủ',  icon: 'dashboard', class: '',show: false },
    { path: '/table-list', title: 'Xem traffic',  icon:'content_paste', class: '',show: false  },
    { path: '/typography', title: 'Cấu hình log',  icon:'library_books', class: '',show: false  },
    { path: '/upgrade', title: 'Báo cáo',  icon:'content_paste', class: '',show: false  },
    { path: '/notifications?screen=search', title: 'Thông báo',  icon:'notifications', class: 'dropdown-toggle',show: true  },
    { path: '/user-profile?screen=profile', title: 'Cài đặt',  icon:'person', class: 'dropdown-toggle',show: true  },
    //{ path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    //{ path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    //{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
