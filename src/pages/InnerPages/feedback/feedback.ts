import { Component } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
import { CrudServices } from '../../../services/crudservice';
import { FeedbackModel } from '../../../models/model.interface';


@Component({
    selector: 'page-feedback',
    templateUrl: 'feedback.html'
})
export class FeedbackPage  {
    msg: string;
    loading: Loading;
    feedbackdetail: FeedbackModel = { FeedbackDate: '', FeedbackMessage: '', FeedbackType: '', StudentModelID:'' };

    constructor(private _crud: CrudServices, public loadingCtrl: LoadingController) {
    }

    SendDetail() {
        this.msg = "";
        this.showLoading();

        //this.storage.get("currentstudentid").then((data) => { this.feedbackdetail.StudentModelID = data; });

        //var studentid = this.storage.get("currentstudentid");

        //var studentid = localStorage.getItem("currentstudentid");

        this.feedbackdetail.StudentModelID = this._crud.getStorage("currentstudentid");
        this._crud.post("Feedback/Create", this.feedbackdetail).subscribe(records => {
            this.loading.dismiss();
            this.msg = "Feedback submitted successfully.";
        },
            error => { this.msg = <any>error; this.loading.dismiss(); });
            
    }
  
  showLoading() {
      this.loading = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange: true
      });
      this.loading.present();
  }
}
