import {
    Component, Input, OnChanges, SimpleChanges, enableProdMode, Output,
    EventEmitter, ChangeDetectorRef
} from '@angular/core';
import * as mu from 'mzmu';
import {$$MonthPicker} from './month-picker.serv';

// enableProdMode();
@Component({
    selector: 'month-picker',
    template: `
        <div class="input-group" 
            month-picker 
            [options]="options"
            (picker)="picker_($event)"
            (selected)="selected_($event)">
            <span class="form-control uneditable-input" >
                {{range?.start}} - {{range?.end}}
            </span>
            <span class="input-group-btn">
                <button class="btn btn-secondary" type="button">
                    <i class="icons icon-calendar"></i>
                </button>
            </span>
        </div>
    `
})
export class $$MonthPickerComponent implements OnChanges {

    @Input() options: any = {};
    @Output() selected: any = new EventEmitter<any>();
    @Output() picker: any = new EventEmitter<any>();

    range: any;

    constructor(private $$MonthPicker: $$MonthPicker, private ref: ChangeDetectorRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        mu.run(mu.prop(changes, 'options.currentValue'), (o) => {
            if (!o['setDate'] && o['startDate'] && o['endDate']) {
                this.options.setDate = [
                    o['startDate'],
                    o['endDate']
                ];
            }
        });
    }

    selected_(rst: any): void {
        this.range = rst;
        this.selected.emit(rst);
    }

    picker_(rst: any): void {
        this.range = rst;
        this.picker.emit(rst);
    }

}