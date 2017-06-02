import {
    Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, enableProdMode, Output,
    EventEmitter, AfterContentChecked, AfterViewChecked
} from '@angular/core';
import * as mu from 'mzmu';
import {$$MonthPicker} from './month-picker.serv';

enableProdMode();
@Component({
    selector: 'month-picker',
    template: `
        <div class="input-group" 
            month-picker 
            [options]="options"
            (getMonths)="getMonths_($event)">
            <span class="form-control uneditable-input" >
                {{range_months?.start}} - {{range_months?.end}}
            </span>
            <span class="input-group-btn">
                <button class="btn btn-secondary" type="button">
                    <i class="icons icon-calendar"></i>
                </button>
            </span>
        </div>
    `
})
export class $$MonthPickerComponent implements OnChanges, AfterViewChecked {

    @Input() options: any;
    @Output() getMonths: any = new EventEmitter<any>();

    range_months: any = {};

    constructor(
        private $$MonthPicker: $$MonthPicker
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        mu.run(mu.prop(changes, 'options.currentValue'), (options) => {
            let setDate = mu.map(options.setDate, (d) => {
                if (typeof d === 'string') {
                    let dd = d.split('-');
                    return [
                        +mu.trim(dd[1]),
                        +mu.trim(dd[0])
                    ]
                }
                return d;
            });

            this.range_months = {
                start: this.$$MonthPicker.dateformat(setDate[0]),
                end: this.$$MonthPicker.dateformat(setDate[1])
            };
        });
    }

    ngAfterViewChecked(): void {
        mu.empty(this.range_months, () => {
            this.range_months = this.$$MonthPicker.options.range_months;
            this.getMonths.emit({
                range_months: this.range_months,
                setDate: this.$$MonthPicker.options.setDate
            });
        });
    }

    getMonths_(rst: any): void {
        this.range_months = rst.range_months;
        this.getMonths.emit(rst);
    }

}