import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';

/**
 * @author ToanNguyen 2018-Oct-18 (verified)
 */
@Injectable()
export class Utils {
    /**
     * Write log
     * @param o Date
     */
    public static log(o: any): void {
        if (environment.showLog) {
            let t = this.format(new Date(), "dd-MMM-yyy HH:mm:ss")
        }
    }

    /**
     * Write log
     * @param s Name
     * @param d Value
     */
    public static logDate(s: string, d: Date): void {
        let t = this.format(d, "dd-MMM-yyy HH:mm:ss")
        this.log(s + " " + t);
    }

    /**
     * Add months
     * @param d Date
     * @param n Month
     */
    public static addMonths(d: Date, n: number): Date {
        let t = d.getMonth() + n;
        let res = new Date(d.setMonth(t));
        return res;
    }

    /**
     * Now
     */
    public static now(): Date {
        let t = new Date();
        let ten = t.setMilliseconds(0);
        let res = new Date(ten);
        return res;
    }

    /**
     * Convert to string
     * @param d Date and time
     * @param f String format
     */
    public static format(d: Date, f: string): string {
        let res = "";

        if (d != null) {
            let datePipe = new DatePipe('en-us');
            res = datePipe.transform(d, f);
        }

        return res;
    }

    /**
     * Clone data
     * @param data
     */
    public static clone(data: any): any {
        if (data != null) {
            return JSON.parse(JSON.stringify(data));
        }
        else {
            return null;
        }
    }

    /**
     * Format number
     * @param value
     * @param currency
     * @param isRed
     */
    public static formatNumber(value: any, currency: string, isRed = false): string {
        let option = {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };

        let t = new Intl.NumberFormat("en-US", option);
        let res = '';

        if (value != null) {
            if (value < 0) {
                currency = '- ' + currency;
                value = -value;
            }
            if (currency != '') {
                res = currency + ' ' + t.format(value);
            }
            else {
                res = t.format(value);
            }
        }

        if (res.indexOf("-") !== -1 && isRed) {
            res = "<span class='text-red'>" + res + "</span>"
        }

        return res;
    }

    /**
     * Format number with digit
     * @param value
     * @param currency
     * @param digits
     * @param isRed
     */
    public static formatNumberWithDigit(value: any, currency: string, digits: any, isRed = false): string {
        let option = {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        };

        let t = new Intl.NumberFormat("en-US", option);
        let res = '';

        if (value != null) {
            if (value < 0) {
                currency = '- ' + currency;
                value = -value;
            }
            if (currency != '') {
                res = currency + ' ' + t.format(value);
            }
            else {
                res = t.format(value);
            }
        }

        if (res.indexOf("-") !== -1 && isRed) {
            res = "<span class='text-red'>" + res + "</span>"
        }

        return res;
    }
}