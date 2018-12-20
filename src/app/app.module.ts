import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { SQLite } from '@ionic-native/sqlite';
import { ClienteDB } from '../providers/database/clientedb';
import { HttpModule } from '@angular/http';
import { CompraDB } from '../providers/database/compradb';
import { ItemDB } from '../providers/database/itemdb';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { PagamentoModalPageModule } from '../pages/pagamento-modal/pagamento-modal.module';
import { ParcelaDB } from '../providers/database/parceladb.';

@NgModule({
  declarations: [
    MyApp
    
  ],
  imports: [
    HttpModule,
    BrowserModule,
    CurrencyMaskModule,
    PagamentoModalPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SQLite,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ClienteDB,
    CompraDB,
    ParcelaDB,
    ItemDB
  ]
})
export class AppModule {}