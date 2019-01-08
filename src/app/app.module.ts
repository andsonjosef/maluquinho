import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
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
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { RelatorioDB } from '../providers/database/relatoriodb';
import { EditarClientePageModule } from '../pages/editar-cliente/editar-cliente.module';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

registerLocaleData(localePt, 'pt');
@NgModule({
  declarations: [
    MyApp
    
  ],
  imports: [
    HttpModule,
    BrowserModule,
    CurrencyMaskModule,
    PagamentoModalPageModule,
    EditarClientePageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SQLite,
    SQLitePorter,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: LOCALE_ID, useValue: 'pt' },
    ClienteDB,
    CompraDB,
    ParcelaDB,
    ItemDB,
    RelatorioDB
  ]
})
export class AppModule {}
