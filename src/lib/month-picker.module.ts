import {NgModule, ModuleWithProviders} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {$$MonthPicker} from './month-picker.serv';
import {MonthPickerDirective} from './month-picker.directive';
import {$$MonthPickerComponent} from './month-picker.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        MonthPickerDirective,
        $$MonthPickerComponent
    ],

    /**
     * 作为子模块, 若主模块需要使用, 那么必须使用 exports
     */
    exports: [
        MonthPickerDirective,
        $$MonthPickerComponent
    ],

    providers: [
        $$MonthPicker
    ]
})
export class MonthPickerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MonthPickerModule
        };
    }
}