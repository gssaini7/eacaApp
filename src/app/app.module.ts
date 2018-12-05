import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/Dashboard/Dashboard';
import { AttendancePage } from '../pages/InnerPages/attendance/attendance';
import { LedgerPage } from '../pages/InnerPages/ledger/ledger';
import { AcademicPage } from '../pages/InnerPages/academic/academic';
import { AcademicSummaryPage } from '../pages/InnerPages/academicsummary/academicsummary';

import { NotificationsPage } from '../pages/InnerPages/notifications/notifications';
import { FeedbackPage } from '../pages/InnerPages/feedback/feedback';
import { AssignmentPage } from '../pages/InnerPages/assignment/assignment';
import { GalleryPage } from '../pages/InnerPages/gallery/gallery';
import { AboutusPage } from '../pages/InnerPages/aboutus/aboutus';
import { AboutusoftsPage } from '../pages/InnerPages/aboutusofts/aboutusofts';
import { GpstrackerPage } from '../pages/InnerPages/gpstracker/gpstracker';
import { onlinepaymentPage } from '../pages/InnerPages/onlinepayment/onlinepayment';

import {   GoogleMaps } from '@ionic-native/google-maps';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { InAppBrowser } from '@ionic-native/in-app-browser';


import { CrudServices } from '../services/crudservice';
import { AuthServices } from '../services/auth-service';

import { NgCalendarModule } from 'ionic2-calendar';
//import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
      MyApp,
      LoginPage,
       HomePage,
      DashboardPage,
      AttendancePage,
      LedgerPage,
      AcademicPage,
      NotificationsPage,
      FeedbackPage,
      AssignmentPage,
      GalleryPage,
      AboutusPage,
      AboutusoftsPage,
      onlinepaymentPage,
      GpstrackerPage,
      AcademicSummaryPage
  ],
  imports: [
      NgCalendarModule,
      BrowserModule, HttpModule,
      IonicModule.forRoot(MyApp),
      //IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      LoginPage,
       HomePage,
      DashboardPage,
      AttendancePage,
      LedgerPage,
      AcademicPage,
      NotificationsPage,
      FeedbackPage,
      AssignmentPage,
      GalleryPage,
      AboutusPage,
      AboutusoftsPage,
      GpstrackerPage,
      AcademicSummaryPage,
      onlinepaymentPage,

  ],
  providers: [
    StatusBar,
      SplashScreen,
      PhotoLibrary,
      InAppBrowser,
      CrudServices,
      AuthServices,
      GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
