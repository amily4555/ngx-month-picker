import {Component} from '@angular/core';
import * as mu from 'mzmu';
import {$$MonthPicker} from '../lib/month-picker.serv';

@Component({
    selector: 'ngx-app',
    template: `
        <div class="container">
            <h2>Angular 4 ngx-month-picker demo</h2>
            <input type="text" month-picker
                [options] = "options"
                (selected)="getMonths($event)"
                (picker)="picker($event)"/>
                
            <month-picker 
                (picker)="picker($event)"
                (selected)="getMonths($event)"
                [options]="options"></month-picker>
                
            
        </div>
  `,
    providers: [
    ]
})
export class AppComponent {

    options: any = {};

    constructor(private $$MonthPicker: $$MonthPicker) {
        setTimeout(() => {
            this.options = {
                maxDate: [3, 2017]
            }
        }, 400)
    }

    getMonths(rst) {
        console.debug(rst);
    }

    picker(rang) {
        console.debug(rang);
    }
}
