import { Component } from '@angular/core';
import { Loading, LoadingController, ViewController, ToastController } from 'ionic-angular';
import { CrudServices } from '../../services/crudservice';
import { StudentModel } from '../../models/model.interface';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    msg: string;
    loading: Loading;
    Students: StudentModel[];
    currentstudent;

    constructor(private _crud: CrudServices, public loadingCtrl: LoadingController, public viewCtrl: ViewController, public toastCtrl: ToastController) {
        this.GetAllChilds();
    }

    GetAllChilds() {
        this.msg = "";
        this.showLoading();
        this.loading.present().then(() =>
            this._crud.get("appdetail/GetAllChilds").subscribe(records => {
               

                this.Students = records;

                //if (records.length > 0) {
                //    localStorage.setItem('currentstudent', records[0].StudentModelID);
                //    localStorage.getItem('currentstudent');
                //}
                this.loading.dismiss();

                this.currentstudent = this._crud.getStorage('currentstudentid');

                //this.currentstudent = localStorage.getItem('currentstudentid');

                },
                error => {
                this.msg = <any>error; this.loading.dismiss(); 
                    })
        );

       
    }

    selectStudent(student) {
        this._crud.setStorage('currentstudentid', student.StudentModelID);
        this._crud.setStorage('currentstudentname', student.strStudentName);

        //localStorage.setItem('currentstudentid', student.StudentModelID);
        //localStorage.setItem('currentstudentname', student.strStudentName);

        this.currentstudent = student.StudentModelID;

        this.presentToast(student.strStudentName + " selected");
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
        });
        //this.loading.present();
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }

    presentToast(msg) {
        const toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }
}
