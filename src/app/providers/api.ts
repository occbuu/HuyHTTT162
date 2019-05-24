import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

/**
 * API is a generic REST Api handler. Set your API url first
 */
@Injectable()
export class ApiProvider {
    public apiUrl = "";
    public imgUrl = "";

    constructor(private http: HttpClient, private rou: Router) {
        if (environment.production) {
            let tmp = !environment.apiUrl.startsWith(location.origin) ? location.origin : "";
            this.apiUrl = tmp + environment.apiUrl;

            tmp = !environment.imgUrl.startsWith(location.origin) ? location.origin : "";
            this.imgUrl = tmp + environment.imgUrl;
        }
        else {
            this.apiUrl = environment.apiUrl;
            this.imgUrl = environment.imgUrl;
        }
    }

    public get(endpoint: string, isAuth: boolean = true, params?: any, reqOpts?: any) {
        if (!reqOpts) {
            reqOpts = {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                params: new HttpParams()
            };
        }

        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            for (let k in params) {
                reqOpts.params.set(k, params[k]);
            }
        }

        return this.http.get(this.apiUrl + endpoint, reqOpts);
    }

    public post(endpoint: string, body: any, isAuth: boolean = true, reqOpts?: any) {
        if (!reqOpts) {
            let h = new HttpHeaders().set('Content-Type', 'application/json');
            reqOpts = { headers: h };
        }

        return this.http.post(this.apiUrl + endpoint, body, reqOpts);
    }
}