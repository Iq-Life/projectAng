import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import { FilterProductsPipe } from './pipes/filter-products.pipe';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RecordingVidioAndAudioComponent } from './recording-vidio-and-audio/recording-vidio-and-audio.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    GlobalErrorComponent,
    FilterProductsPipe,
    MapComponent,
    RecordingVidioAndAudioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
