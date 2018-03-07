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
export class MonthPickerDirective implements AfterViewInit, OnChanges {
    @Input() options: any;
    @Output() picker: EventEmitter<any> = new EventEmitter<any>();
    @Output() selected: EventEmitter<any> = new EventEmitter<any>();

    $rp: any;

    constructor(private elm: ElementRef,
                private $$MonthPicker: $$MonthPicker) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        mu.run(changes['options'], () => {
            mu.run(this.$rp, () => {
                this.init();
            });
        });
    }

    // -> 日期转换
    transform(d: any): any[] {
        if (typeof d !== 'object') {
            const dd = ('' + d).split('-');
            return [
                +mu.trim('' + dd[1]),
                +mu.trim('' + dd[0])
            ];
        }
        return d;
    }

    // -> options 时间转换
    transoptions(options): any {
        options.setDate = mu.map(options.setDate, (d) => this.redate(this.transform(d)));
        options.minDate = this.transform(options.minDate);
        options.maxDate = this.transform(options.maxDate);
        return options;
    }

    // 计算两个时间间隔的月份
    diff(end, start): number {
        const end_ = end[1] * 12 + end[0];
        const start_ = start[1] * 12 + start[0];
        return end_ - start_;
    }

    redate(date) {
        let [month, year] = date;
        if (!month) {
            month = 12;
            year = year - 1;
        }
        return [month, year];
    }

    diffresult(date, diff): any[] {
        const date_ = date[1] * 12 + date[0];
        const result = date_ - diff;

        const month = result % 12;
        const year = Math.floor(result / 12);

        return this.redate([
            month,
            year
        ]);
    }

    calc(options): boolean {
        let rst = false;
        const diff = this.diff;
        let start = this.redate(options.setDate[0]);
        let end = this.redate(options.setDate[1]);
        const end_diff_start = diff(end, start);
        const min = options.minDate;
        const max = options.maxDate;

        if (diff(end, max) > 0) {
            end = mu.clone(max);
            start = this.diffresult(end, end_diff_start);
            rst = true;
        }

        if (diff(min, start) > 0) {
            start = mu.clone(min);
            rst = true;
        }

        options.setDate = [
            start,
            end
        ];

        return rst;
    }

    ngAfterViewInit(): void {
        this.init();
    }

    setPicker = mu.debounce((options, result) => {
        this.picker.emit({
            options,
            result,
            start: this.$$MonthPicker.dateformat(result[0]),
            end: this.$$MonthPicker.dateformat(result[1])
        });
    }, 300);

    init() {
        mu.run(this.$rp, () => {
            this.$rp.destroy();
        });

        const nd = new Date();
        nd.setMonth(nd.getMonth() - 1);
        const yyyy = nd.getFullYear();
        const MM = nd.getMonth();

        let options = {
            closeOnSelect: true,
            presets: [
                {
                    buttonText: 'Latest 1 Month',
                    value: '1m'
                },
                {
                    buttonText: 'Latest 3 Months',
                    value: '3m'
                },
                {
                    buttonText: 'Latest 6 Months',
                    value: '6m'
                },
                {
                    buttonText: 'Latest 12 Months',
                    value: '12m'
                }
            ],

            minDate: [
                1,
                2015
            ],

            maxDate: [
                MM + 1,
                yyyy
            ],

            setDate: [
                [
                    MM - 1,
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
        options = this.transoptions(options);
        // this.$$MonthPicker.setOptions(options);
        const $elm = (<any>$(this.elm.nativeElement));
        $elm.rangePicker(options);
        this.$rp = $elm.data('_ranegPicker');

        if (this.calc(options)) {
            this.$rp.update(options.setDate);
        }

        mu.run($elm.data('_ranegPicker'), ($rp) => {
            this.setPicker(options, $rp.result);
        });

        $elm.on('datePicker.done', (e, result) => {
            options.setDate = result;
            if (this.calc(options)) {
                this.$rp.update(options.setDate);
            }

            this.selected.emit({
                options,
                result: options.setDate,
                start: this.$$MonthPicker.dateformat(options.setDate[0]),
                end: this.$$MonthPicker.dateformat(options.setDate[1])
            });
        });
    }
}
