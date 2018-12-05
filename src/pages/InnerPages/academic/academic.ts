import { Component } from '@angular/core';
import { Loading, LoadingController, NavController } from 'ionic-angular';
import { CrudServices } from '../../../services/crudservice';
import { AcademicModel } from '../../../models/model.interface';
import { AcademicSummaryPage } from '../academicsummary/academicsummary';



@Component({
    selector: 'page-academic',
    templateUrl: 'academic.html'
})
export class AcademicPage {
    msg: string;
    loading: Loading;
    academicdetail: AcademicModel[];
    filteredacademicdetail: AcademicModel[];

    resulttype: string[];
    resulttypeselected: any;


    constructor(private _crud: CrudServices, public loadingCtrl: LoadingController, public navCtrl: NavController) {
        this.GetDetail();
  }

    GetDetail() {
        this.msg = "";
        this.showLoading();
        this.loading.present().then(() => {
            var studentid = this._crud.getStorage("currentstudentid");
            //var studentid = localStorage.getItem("currentstudentid");

            this._crud.get("appdetail/GetAcademicDetail?id=" + studentid).subscribe(records => {
                this.academicdetail = records;
                
                let termsarray = this._crud.unique(records, 'ForTerm');
                this.resulttype = this._crud.removeDuplicates(termsarray, 'TermModelid');
            },
                error => { this.msg = <any>error;  });
        });
    }
    SelectedOption() {
        this.filteredacademicdetail = this.academicdetail.filter(a => a.TermModelid === this.resulttypeselected.TermModelid);
       

    }

    GetDetailMarks(subject) {
        this.navCtrl.push(AcademicSummaryPage, {
            subjectname: subject.SubjectName,
            subjectid: subject.SubjectModelid,
            termid: this.resulttypeselected.TermModelid,
            termname: this.resulttypeselected.TermName,

        });
        
    }

  showLoading() {
      this.loading = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange: true
      });
  }
}
