import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {MonthPickerModule} from '../lib/month-picker.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MonthPickerModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
