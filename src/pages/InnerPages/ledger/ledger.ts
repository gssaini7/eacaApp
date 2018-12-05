import { Component } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
import { CrudServices } from '../../../services/crudservice';
import { LedgerModel, LedgerDetailModel } from '../../../models/model.interface';


@Component({
    selector: 'page-ledger',
    templateUrl: 'ledger.html'
})
export class LedgerPage {
    msg: string;
    loading: Loading;
    MainLedger: LedgerModel;
    LedgerDetail: LedgerDetailModel[];

    constructor(private _crud: CrudServices, public loadingCtrl: LoadingController) {
        this.GetDetail();
  }

  GetDetail() {
      this.msg = "";
      this.showLoading();
      var studentid = this._crud.getStorage("currentstudentid");
      this._crud.get("appdetail/GetLedger?id=" + studentid).subscribe(records => {
          this.MainLedger = records;
      },
          error => { this.msg = <any>error; this.loading.dismiss(); });
    }

  GetLedgerSummary() {
      this.msg = "";
      this.showLoading();
      var studentid = this._crud.getStorage("currentstudentid");
      this._crud.get("appdetail/GetLedgerDetail?id=" + studentid).subscribe(records => {
          this.LedgerDetail = records;
          this.loading.dismiss();

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
