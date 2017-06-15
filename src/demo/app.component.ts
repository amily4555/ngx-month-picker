import {Component} from '@angular/core';
import * as mu from 'mzmu';
import {$$MonthPicker} from '../lib/month-picker.serv';

@Component({
    selector: 'ngx-app',
    template: `
        <div class="container">
            <h2>Angular 4 ngx-month-picker demo</h2>
            <input type="text" month-picker
                (selected)="getMonths($event)"
                (picker)="picker($event)"/>
            <!--<month-picker -->
                <!--[options]="{setDate:['2017-02', [3, 2017]]}"></month-picker>-->
                <!---->
            <!--<month-picker -->
                <!--(getMonths)="getMonths($event)"></month-picker>-->
            
        </div>
  `,
    providers: [
        // { provide: TreeviewI18n, useClass: DefaultTreeviewI18n }
    ]
})
export class AppComponent {

    constructor(private $$MonthPicker: $$MonthPicker) {

    }

    getMonths(rst) {
        console.debug(rst);
    }

    picker(rang) {
        console.debug(rang);
    }
}
