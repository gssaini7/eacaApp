import { Component } from '@angular/core';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import { CrudServices } from '../../../services/crudservice';
import { NotificationScheduleModel } from '../../../models/model.interface';
import { PhotoLibrary } from '@ionic-native/photo-library';

@Component({
    selector: 'page-assignment',
    templateUrl: 'assignment.html'
})
export class AssignmentPage  {
    msg: string;
    loading: Loading;
    notificationdetails: NotificationScheduleModel[];
    notificationbysubject: NotificationScheduleModel[];

    imagedir: string;
    subjects: string[];
    isList: boolean = false;

    constructor(private _crud: CrudServices, public loadingCtrl: LoadingController, private photoLibrary: PhotoLibrary, public toastCtrl: ToastController) {
        this.GetDetail();
    }


   
    GetDetail() {
        this.msg = "";
        this.showLoading();
        this.notificationbysubject = [];
        this.loading.present().then(() => {
            var studentid = this._crud.getStorage("currentstudentid");

            //var studentid = localStorage.getItem("currentstudentid");
            this._crud.get("appdetail/GetNotificationDetail?id=" + studentid + "&type=assignment").subscribe(records => {
                this.notificationdetails = records;
                this.imagedir = this._crud.weburl + "ReadWrite/" + this._crud.getStorage("dbcodeid");
                let blogdetails = this._crud.unique(records, 'BlogDetail');
                let subjectsarray = this._crud.unique(blogdetails, 'ForSubject');
                let subjectslocal = this._crud.removeDuplicates(subjectsarray, 'SubjectModelid');
                this.subjects = subjectslocal;
                this.isList = false;
            },
                error => { this.msg = "No work sheet there."; this.loading.dismiss(); });
        });
    }

    subjectSelected(subject) {
        this.notificationbysubject = this.notificationdetails.filter(a => a.BlogDetail.SubjectModelid === subject.SubjectModelid);
        this.isList = true;
    }
  
  showLoading() {
      this.loading = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange: true
      });
    }

  savetolibrary(bgdetail) {

      this.photoLibrary.requestAuthorization({ write: true }).then(() => {
          //this.photoLibrary.getLibrary().subscribe({
          //    next: library => {
          //        library.forEach(function (libraryItem) {
          //            this.presentToast(libraryItem.id);          // ID of the photo
          //            console.log(libraryItem.photoURL);    // Cross-platform access to photo
          //            console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
          //            console.log(libraryItem.fileName);
          //            console.log(libraryItem.width);
          //            console.log(libraryItem.height);
          //            console.log(libraryItem.creationDate);
          //            console.log(libraryItem.latitude);
          //            console.log(libraryItem.longitude);
          //            console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
          //        });
          //    },
          //    error: err => { this.presentToast('could not get photos'); },
          //    complete: () => { this.presentToast('done getting photos'); }
          //});

          this.photoLibrary.saveImage(this.imagedir + "/" + bgdetail.imagepath, bgdetail.BlogType.BlogTypeDisplayName).then((entry => {
              //error: err => { console.log('Error in saving image'); },

              //complete: () => { console.log('Image Saved'); }
              this.presentToast('Image Saved');
          }),
              (error) => {
                  //this.presentToast('Error in saving image');
                  this.presentToast("Inner " + error);

              });


            })
          .catch(err =>
              this.presentToast("Outer " + err)

          //this.presentToast('Permissions weren\'t granted')
          );

  }

  presentToast(msg) {
      const toast = this.toastCtrl.create({
          message: msg,
          duration: 3000
      });
      toast.present();
  }
}
