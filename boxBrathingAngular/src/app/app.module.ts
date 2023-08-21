import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoxBreathingComponent } from './box-breathing/box-breathing.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxBreathingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
