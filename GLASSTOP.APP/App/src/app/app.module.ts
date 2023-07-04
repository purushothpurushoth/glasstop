import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store/app-store.module';
import { AppComponent } from './app.component';
import { AppService } from './service/app-service/app.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HTTPInterceptor } from './interceptor/http.interceptor';
import { SplitPanelModule } from './shared/split-panel/split-panel.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    AppStoreModule,
    SplitPanelModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [AppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass :HTTPInterceptor,
      multi: true      
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
