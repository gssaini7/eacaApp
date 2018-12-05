import { Component, ViewChild } from '@angular/core';
import { Nav, Platform  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';

import { AuthServices } from '../services/auth-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private _authservice: AuthServices) {
      this.initializeApp();
    // used for an example of ngFor and navigation
    //this.pages = [
    //    { title: 'Dashboard', component: DashboardPage },
    //    { title: 'Home', component: HomePage },
    //];
  }

  //GetSchoolDetail() {
  //    this.schooldetail = "";
  //    this.showLoading();
  //    this.loading.present().then(() =>
  //        this._crud.get("appdetail/GetSchoolDetail").subscribe(
  //            record => {
  //            this.schooldetail = record;
  //            this.loading.dismiss();
  //            this.GetAllChilds();
  //            }
  //        ),
  //            error => {
  //            this.loading.dismiss();
  //        });
  //}

  //GetAllChilds() {
  //    this.showLoading();
  //    this.loading.present().then(() =>
  //        this._crud.get("appdetail/GetAllChilds").subscribe(records => {
  //            console.log("eeeeeeee");
  //            if (records.length > 0) {
  //                localStorage.setItem('currentstudent', records[0].StudentModelID);
  //                this.studentdetailname = records[0].strStudentName;
  //            }
  //            this.loading.dismiss();
  //        }),
  //        error => {
  //            console.log("eeeeeeee");
  //            this.loading.dismiss();
  //        });
  //}

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        this.statusBar.styleLightContent();
        // let status bar overlay webview
        //this.statusBar.overlaysWebView(true);

        // set status bar to white
        //this.statusBar.backgroundColorByHexString('#4E8EF7');
        //this.statusBar.backgroundColorByName('Red');
        //if (this.platform.is('android')) {
            
        //        // Okay, so the platform is ready and our plugins are available.
        //        // Here you can do any higher level native things you might need.
        //    // Splashscreen.hide();
        //    this.statusBar.overlaysWebView(true);
        //    this.statusBar.backgroundColorByHexString('#00FFFF');
           
        //}
      //this.statusBar.overlaysWebView(true);
      //this.statusBar.backgroundColorByHexString('#1A336B');
      this.splashScreen.hide();
     

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }



  LogOut() {
      this._authservice.logout();
      this.nav.setRoot(LoginPage);

  }

  //isDashboard() {
  //    let active = this.nav.getActive();
  //    if (active !== undefined) {
  //        if (this.nav.getActive().component.name === "DashboardPage")
  //            return true;
  //    }
  //    return false;
  //}

  //showLoading() {
  //    this.loading = this.loadingCtrl.create({
  //        content: 'Please wait...',
  //    });
  //}
}
