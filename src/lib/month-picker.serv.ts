import {Injectable} from '@angular/core';
import * as mu from 'mzmu';

@Injectable()
export class $$MonthPicker {
    constructor() {
    }

    options: any = {};

    setOptions(options: any): void {
        this.options = options;
    }

    dateformat(d: any[]): string {
        return d[1] + '-' + (<any>mu).leftpad(d[0], 2);
    }
}