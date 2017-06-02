import * as mu from 'mzmu';
import {
    AfterViewInit, Input, ElementRef, Directive, Output, EventEmitter, OnChanges,
    SimpleChanges
} from '@angular/core';
import './month-picker.js';
import {$$MonthPicker} from 'ngx-month-picker';

@Directive({
    selector: '[month-picker]'
})
export class $$MonthPickerDirective implements AfterViewInit, OnChanges {
    @Input() options: any;
    @Output() getMonths: EventEmitter<any> = new EventEmitter<any>();

    constructor(private elm: ElementRef,
                private $$MonthPicker: $$MonthPicker) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        mu.run(mu.prop(changes, 'options.currentValue'), (options) => {
            this.options = options;
        });
    }

    ngAfterViewInit(): void {
        let nd = new Date();
        nd.setMonth(nd.getMonth() - 1);
        let yyyy = nd.getFullYear();
        let MM = nd.getMonth();

        let options = {
            closeOnSelect: true,
            presets: [
                {
                    buttonText: 'Last 1 Month',
                    value: '1m'
                },
                {
                    buttonText: 'Last 3 Months',
                    value: '3m'
                },
                {
                    buttonText: 'Last 6 Months',
                    value: '6m'
                },
                {
                    buttonText: 'Last 12 Months',
                    value: '12m'
                }
            ],

            minDate: [
                1,
                2010
            ],
            maxDate: [
                MM + 1,
                yyyy
            ],
            setDate: [
                [
                    MM - 2,
                    yyyy
                ],
                [
                    MM + 1,
                    yyyy
                ]
            ],

            range_months: {}
        };

        options = mu.extend(true, {}, options, this.$$MonthPicker.options, this.options);


        options.setDate = mu.map(options.setDate, (d) => {
            if (typeof d === 'string') {
                let dd = d.split('-');
                return [
                    +mu.trim(dd[1]),
                    +mu.trim(dd[0])
                ]
            }
            return d;
        });

        options.range_months = {
            start: this.$$MonthPicker.dateformat(options.setDate[0]),
            end: this.$$MonthPicker.dateformat(options.setDate[1])
        };

        this.$$MonthPicker.setOptions(options);

        let $elm = (<any>$(this.elm.nativeElement));
        $elm.rangePicker(options);
        $elm.on('datePicker.done', (e, result) => {
            this.getMonths.emit({
                event: e,
                result,
                range_months: {
                    start: this.$$MonthPicker.dateformat(result[0]),
                    end: this.$$MonthPicker.dateformat(result[1])
                }
            });
        });
    }


}
