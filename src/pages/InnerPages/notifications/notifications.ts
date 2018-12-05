import { Component } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
import { CrudServices } from '../../../services/crudservice';
import { NotificationScheduleModel } from '../../../models/model.interface';

@Component({
    selector: 'page-notifications',
    templateUrl: 'notifications.html'
})
export class NotificationsPage  {
    msg: string;
    loading: Loading;
    notificationdetails: NotificationScheduleModel[];
    imagedir: string;

    constructor(private _crud: CrudServices, public loadingCtrl: LoadingController) {
        this.GetDetail();
  }

    GetDetail() {
        this.msg = "";
        this.showLoading();
        this.loading.present().then(() => {
            var studentid = this._crud.getStorage("currentstudentid");
            this._crud.get("appdetail/GetNotificationDetail?id=" + studentid + "&type=Notification").subscribe(records => {
                this.notificationdetails = records;
                
                this.imagedir = this._crud.weburl + "ReadWrite/" + this._crud.getStorage("dbcodeid");


            },
                error => { this.msg = "No notifications there."; this.loading.dismiss(); });
        });
    }
  
  showLoading() {
      this.loading = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange: true
      });
  }
}
