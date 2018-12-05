import { Component } from '@angular/core';
import { Loading, LoadingController, NavParams } from 'ionic-angular';
import { CrudServices } from '../../../services/crudservice';
//import { AcademicModel } from '../../../models/model.interface';


@Component({
    selector: 'page-academicsummary',
    templateUrl: 'academicsummary.html'
})
export class AcademicSummaryPage {
    msg: string;
    loading: Loading;
    termid;
    termname;
    subjectid;
    subjectname;

    mainobject;
    teststudid;

    constructor(private _crud: CrudServices, public loadingCtrl: LoadingController, public navParams: NavParams) {
        this.subjectname = navParams.get("subjectname");
        this.subjectid = navParams.get("subjectid");
        this.termid = navParams.get("termid");
        this.termname = navParams.get("termname");
        
        this.GetDetail();
  }

    GetDetail() {
        this.msg = "";
        this.showLoading();
        this.loading.present().then(() => {
            var studentid = this._crud.getStorage("currentstudentid");
            this.teststudid = studentid;
            this._crud.get("appdetail/GetAcademicSummray?stuid=" + studentid + "&termid=" + this.termid + "&subjectid=" + this.subjectid).subscribe(records => {
                this.mainobject = records;
                //let termsarray = this._crud.unique(records, 'ForTerm');
                //this.mainobject = this._crud.removeDuplicates(termsarray, 'TermModelid');
            },
                error => { this.msg = <any>error;  });
        });
    }

   
  showLoading() {
      this.loading = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange: true
      });
  }
}
