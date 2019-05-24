import { Injectable } from '@angular/core';
import { ApiProvider } from 'app/providers/api';

@Injectable()
export class HuyProvider {
    constructor(private api: ApiProvider) { }

    /**
     * Search log
     */
    public searchLog(info: any) {
        return this.api.post("huy/search-log", info);
    }
}