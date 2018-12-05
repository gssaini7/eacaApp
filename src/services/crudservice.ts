import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

//import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../services/baseservice';
//import { Storage } from '@ionic/storage';


@Injectable()
export class CrudServices extends BaseService {
    weburl: string = this.baseUrl();
    apiUrl: string = this.baseUrl() + "api/";

    constructor(private http: Http) {
        super();
    }

    get(url: string): Observable<any> {
        return this.http.get(this.apiUrl + url, { headers: this.setheader() })
            .map((response: Response) =>
                <any>response.json())
            .catch(this.handleError);
            //.catch(error => {
            //    //var a = this.handleError(error);
              
            //    //if (a.error == '401') {
            //    //    return Observable.throw(a.error)
            //    //}

            //    return this.handleError(error);
            //});
    }


    
    //get(url: string): Observable<any> {
    //    return this.http.get(this.apiUrl + url, { headers: this.setheader() })
    //        .map((response: Response) => <any>response.json())
    //        .catch(this.handleError);
    //}

    post(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let options = new RequestOptions({ headers: this.setheader() });
        return this.http.post(this.apiUrl + url, body, options)
            .map(res => res)
            .catch(this.handleError);
    }

    postwithresponse(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let options = new RequestOptions({ headers: this.setheader() });
        return this.http.post(this.apiUrl + url, body, options)
            .map((response: Response) => response)
            .catch(this.handleError);
    }

    put(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let options = new RequestOptions({ headers: this.setheader() });
        return this.http.put(this.apiUrl + url, body, options)
            .map(res => true)
            .catch(this.handleError);
    }

    delete(url: string, id: string): Observable<any> {
        let options = new RequestOptions({ headers: this.setheader() });
        return this.http.delete(this.apiUrl + url, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    setheader() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //let authToken = localStorage.getItem('auth_token');
        //let dbcodeid = localStorage.getItem('dbcodeid');
        let authToken = this.getStorage('auth_token');
        let dbcodeid = this.getStorage('dbcodeid');
        headers.append('Authorization', `Bearer ${authToken}`);
        headers.append('dbcodeid', dbcodeid);
        return headers;

        
    }

    getStorage(strKey): any{
        //console.log(strKey);
        //this.storage.get(strKey).then((value) => {
        //    console.log(value);

        //    //return value;
        //});
        //return null;
        return window.localStorage.getItem(strKey);

    }

    setStorage(strKey, strvlaue) {
        window.localStorage.setItem(strKey, strvlaue);
       
    }

    removeStorage(strKey) {
        window.localStorage.removeItem(strKey);
        //this.storage.remove(strKey);
    }

    unique(arr: any, prop: any) {
        return arr.map(function (e: any) { return e[prop]; }).filter(function (e: any, i: any, a: any) {
            return i === a.indexOf(e);
        });
    }

    removeDuplicates(arr: any, prop: any) {
        var newArray = [];
        var lookupObject = {};

        for (var i in arr) {
            lookupObject[arr[i][prop]] = arr[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }

}
