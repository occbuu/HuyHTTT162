import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Chartist from 'chartist';
import { HuyProvider } from 'app/providers/huy';
import { HTTP } from 'app/utilities';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
    itemresults: any[];
    lst: any[];

    public pageSize = 10;
    public pager: any = {};
    public pagedItems: any[];
    public total: number = 0;
    public setting = {};

    public filterType = "";
    public filterValue = "";

    constructor(
        private proHuy: HuyProvider,
        public http: HttpClient) { }

    ngOnInit() {
        this.setSetting();
        this.searchClick(1);

        //this.itemresults = ROUTES.filter(itemresult => itemresult);
        // this.http.get("./assets/snortdata.json").subscribe(
        //   data => {
        //     this.lst = data as any [];	 // FILL THE ARRAY WITH DATA.
        //     //  console.log(this.arrBirds[1]);
        //   },
        // );

        const dataDailySalesChart: any = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [2300, 1800, 2240, 1908, 1500, 1680, 2500, 2900]
            ]
        };
        const optionsDailySalesChart: any = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 4000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
        this.startAnimationForLineChart(dailySalesChart);

        const dataCompletedTasksChart: any = {
            labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
            series: [
                [230, 750, 450, 300, 280, 240, 200, 190]
            ]
        };

        const optionsCompletedTasksChart: any = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
        }

        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

        this.startAnimationForLineChart(completedTasksChart);
    }

    filterTypeChange(event) {
        if (event.target.value == '') this.searchLog(1);
    }

    filterChange(value) {
        let filter = {
            [this.filterType]: value
        };
        this.searchLog(1, filter);
    }

    startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    };

    searchLog(page: any, filter = null) {
        let x = {
            filter: filter,
            page: page,
            size: this.pageSize,
            sort: [
                {
                    direction: "ASC",
                    field: "clientAccount"
                }
            ]
        };

        this.proHuy.searchLog(x).subscribe((rsp: any) => {
            if (rsp.variant === HTTP.STATUS_SUCCESS) {
                this.lst = rsp.data;
                this.total = rsp.totalRecords;
                this.setPage(page);
            }
        }, (err) => {
            console.log(err);
        });
    }

    public setSetting() {
        let tmpData = {
            selectMode: 'single',
            hideHeader: false,
            hideSubHeader: false,
            actions: {
                add: false,
                edit: false,
                delete: false,
                custom: [],
            },
            handle: {
                editable: false
            },
            noDataMessage: 'No data found',
            columns: {
                id: {
                    title: 'Description',
                    type: 'text',
                    filter: false
                },
                duration: {
                    title: 'Duration',
                    type: 'html',
                    filter: false
                },
                source: {
                    title: 'Source',
                    type: 'html',
                    filter: false
                },
                destination: {
                    title: 'Destination',
                    type: 'html',
                    filter: false
                },
                protocol: {
                    title: 'Protocol',
                    type: 'html',
                    filter: false
                },
                length: {
                    title: 'Length',
                    type: 'html',
                    filter: false
                },
                info: {
                    title: 'Info',
                    type: 'html',
                    filter: false
                },
                type: {
                    title: 'Type',
                    type: 'html',
                    filter: false
                },
                sourcePort: {
                    title: 'Source Port',
                    type: 'html',
                    filter: false
                },
                destinationPort: {
                    title: 'Destination Port',
                    type: 'html',
                    filter: false
                },
                messagePhase: {
                    title: 'Message Phase',
                    type: 'html',
                    filter: false
                },
                clientExchange: {
                    title: 'Client Exchange',
                    type: 'html',
                    filter: false
                },
                cipherChange: {
                    title: 'Cipher Change',
                    type: 'html',
                    filter: false
                },
                ping: {
                    title: 'Ping',
                    type: 'html',
                    filter: false
                }
            }
        };

        this.setting = tmpData;
    }

    public searchClick(page: any) {
        this.searchLog(page);
        this.pager = page;
    }

    public setPage(page: number) {
        this.pager = this.getPager(this.total, page, this.pageSize);
        this.pagedItems = this.lst.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    private getPager(totalItems: number, currentPage: number = 1, pageSize: number = 1) {
        let totalPages = Math.ceil(totalItems / pageSize);

        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}
