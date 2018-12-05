import { Component } from '@angular/core';
import { NavController, Loading, LoadingController, ModalController} from 'ionic-angular';
import { AttendancePage } from '../../pages/InnerPages/attendance/attendance';
import { LedgerPage } from '../../pages/InnerPages/ledger/ledger';
import { AcademicPage } from '../../pages/InnerPages/academic/academic';
import { NotificationsPage } from '../../pages/InnerPages/notifications/notifications';
import { FeedbackPage } from '../../pages/InnerPages/feedback/feedback';
import { AssignmentPage } from '../../pages/InnerPages/assignment/assignment';
import { GalleryPage } from '../../pages/InnerPages/gallery/gallery';
import { HomePage } from '../../pages/home/home';
import { AboutusPage } from '../../pages/InnerPages/aboutus/aboutus';
import { AboutusoftsPage } from '../../pages/InnerPages/aboutusofts/aboutusofts';
import { GpstrackerPage } from '../../pages/InnerPages/gpstracker/gpstracker';
import { onlinepaymentPage } from '../../pages/InnerPages/onlinepayment/onlinepayment';


import { LoginPage } from '../../pages/login/login';

import { AuthServices } from '../../services/auth-service';
import { CrudServices } from '../../services/crudservice';




@Component({
    selector: 'page-dashboard',
    templateUrl: 'Dashboard.html'
})
export class DashboardPage {
    msg: string;
    //rootPage: any = DashboardPage;
  //pages: Array<{ title: string, component: any }>;

  schooldetail;
  //studentdetailname;
  loading: Loading;

  constructor(public navCtrl: NavController, private _authservice: AuthServices, private _crud: CrudServices, public loadingCtrl: LoadingController
      , public modalCtrl: ModalController) {

      if (!_authservice.gs_hasToken()) {
            this.navCtrl.setRoot(LoginPage);
            return;
      }
        this.GetSchoolDetail();
    }

    GotoPage(selectedpage) {
        switch (selectedpage) {
            case "Attendance": {
                this.navCtrl.push(AttendancePage);
                break;
            }
            case "Ledger": {
                this.navCtrl.push(LedgerPage);
                break;
            }
            case "Academic": {
                this.navCtrl.push(AcademicPage);
                break;
            }
            case "Notifications": {
                this.navCtrl.push(NotificationsPage);
                break;
            }
            case "Feedback": {
                this.navCtrl.push(FeedbackPage);
                break;
            }
            case "WorkSheet": {
                this.navCtrl.push(AssignmentPage);
                break;
            }
            case "Gallery": {
                this.navCtrl.push(GalleryPage);
                break;
            }
            case "Student": {
                this.navCtrl.push(HomePage);
                break;
            }
            case "AboutUs": {
                this.navCtrl.push(AboutusPage);
                break;
            }
            case "AboutUsofts": {
                this.navCtrl.push(AboutusoftsPage);
                break;
            }
            case "gpstracker": {
                this.navCtrl.push(GpstrackerPage);
                break;
            }
            case "OnlinePayment": {
                this.navCtrl.push(onlinepaymentPage);
                break;
            }

                
        }

  }

    GetSchoolDetail() {

        this.showLoading();
        this.loading.present().then(() =>
            this._crud.get("appdetail/GetSchoolDetail")
               
                //.finally(() => {
                ////this.navCtrl.setRoot(LoginPage);
                //    console.log(this._authservice.isLoggedIn());
                //    this._authservice.logout();
                //    this.navCtrl.setRoot(LoginPage);
            //})
    .subscribe(
                record => {
                    this.schooldetail = record;

                    //console.log(this._crud.getStorage('currentstudentname'));
                    if (this._crud.getStorage('currentstudentname') === null)
                        this.GetAllChilds();
                    //if (localStorage.getItem('currentstudentname') === null)
                    //    this.GetAllChilds();
                    this.loading.dismiss();

                },
            
                error => {
                    if (error == '401') {
                        this._authservice.logout();
                        this.navCtrl.setRoot(LoginPage);
                    }
                    this.loading.dismiss();


            }));
    }

    GetAllChilds() {
        //this.showLoading();
        this.loading.present().then(() =>
            this._crud.get("appdetail/GetAllChilds").subscribe(records => {
                if (records.length > 0) {
                    this._crud.setStorage('currentstudentid', records[0].StudentModelID);
                    this._crud.setStorage('currentstudentname', records[0].strStudentName);

                    //localStorage.setItem('currentstudentid', records[0].StudentModelID);
                    //localStorage.setItem('currentstudentname', records[0].strStudentName);

                }
                //this.loading.dismiss();
            },
                error => {
                    //this.loading.dismiss();
                })
        );
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
        });
    }

    //openModal(modalname) {
    //    let modal;
    //    switch (modalname) {
    //        case "Student":
    //             modal = this.modalCtrl.create(HomePage);
    //            modal.present();
    //            break;
    //        case "AboutUs":
    //             modal = this.modalCtrl.create(AboutusPage);
    //            modal.present();
    //            break;
    //    }

       
    //}

    LogOut() {
        this._authservice.logout();
        this.navCtrl.setRoot(LoginPage);

    }

}
