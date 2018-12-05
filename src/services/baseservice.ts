
import { Observable } from 'rxjs/Rx';
export abstract class BaseService {

    constructor() {
    }

    //protected handleError(error: Response) {
    //   if (error.status === 401) {
    //       return Observable.throw(error.status);
    //    }
    //   else {
    //       return Observable.throw(error);
    //   }
    //}

    protected handleError(error: any) {
        var applicationError = error.headers.get('Application-Error');
        
        // either applicationError in header or model error in body
        if (applicationError) {
            return Observable.throw(applicationError);
        }

        if (error.status === 401) {
            //localStorage.removeItem('auth_token');
            //localStorage.removeItem('dbcodeid');
            //localStorage.removeItem('usermobile');
            //localStorage.removeItem('currentstudent');

            return Observable.throw(error.status);
        }   

        var modelStateErrors: string = '';
        var serverError = error.json();

        if (!serverError.type) {
            for (var key in serverError) {

                if (serverError[key]) {
                    if (typeof serverError[key] === "string")
                        modelStateErrors += serverError[key] + '\n';
                    if (typeof serverError[key] === "object") {
                        var newobj = serverError[key];
                        for (var innerkey in newobj) {
                            modelStateErrors += newobj[innerkey] + '\n';
                        }
                    }
                }
            }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        
        return Observable.throw(modelStateErrors || 'Server error');
    }

    protected baseUrl() {
        //return "http://localhost:51131/";
       return "http://login.eacademics.in/";

    }
}