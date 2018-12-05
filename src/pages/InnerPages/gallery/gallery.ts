import { Component } from '@angular/core';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import { CrudServices } from '../../../services/crudservice';


@Component({
    selector: 'page-gallery',
    templateUrl: 'gallery.html'
})
export class GalleryPage  {
    msg: string;
    loading: Loading;
    imagedir: string;
    albums: string[];
    images: string[];

    isImages: boolean = false;

    constructor(private _crud: CrudServices, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
        this.GetDetail();
    }

  
    GetDetail() {
        this.msg = "";
        this.showLoading();
        this.loading.present().then(() => {
            this._crud.get("appdetail/GetAlbums").subscribe(records => {
                this.albums = records;
                this.isImages = false;
            },
                error => { this.msg = "There is not any image to show."; this.loading.dismiss(); });
        });
    }

    GetImages(album) {
        this.msg = "";
        this.showLoading();
        this.loading.present().then(() => {
            this._crud.get("appdetail/GetGallery?id=" + album.AlbumModelid).subscribe(records => {
                this.images = records;
                this.imagedir = this._crud.weburl + "ReadWrite/" + this._crud.getStorage("dbcodeid");
                this.isImages = true;
                this.loading.dismiss();
            },
                error => { this.msg = "There is not any image to show."; this.loading.dismiss(); this.presentToast("Images not found in this album."); });
        });
    }
   
 
  
  showLoading() {
      this.loading = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange: true
      });
    }

  presentToast(msg) {
      const toast = this.toastCtrl.create({
          message: msg,
          duration: 3000
      });
      toast.present();
  }
}
