import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class Socialservice {

    public base_url = "http://ec2-52-66-251-245.ap-south-1.compute.amazonaws.com:5000/";
    //public base_url = "http://localhost:5000/";
    private signupUrl:string = this.base_url+"signup";
    private signinUrl:string = this.base_url+"login";
    constructor(private http:HttpClient){

    }

    signup(data){
        return  this.http.post<any>(this.signupUrl,data,{ observe: 'response' })
      .pipe(retry(1),catchError(this.errorHandler)); 
    }

    login(data){
        return  this.http.post<any>(this.signinUrl,data,{ observe: 'response' })
      .pipe(retry(1),catchError(this.errorHandler));
    }
    private errorHandler(error){

        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = error.error;
        } else {
            // server-side error
            errorMessage = error;
        }
        return throwError(errorMessage);
    }

}