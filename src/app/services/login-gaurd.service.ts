import { Socialservice } from './social.service';
import { Injectable } from '@angular/core';
import { CanActivate , Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class LoginGaurd implements CanActivate{

    constructor(private router:Router,private service:Socialservice){

    }
    /* canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot ){
        if(localStorage.getItem('loginToken')){
            return this.service.varifyAuthToken().subscribe((response)=>{

                console.log(response)
                return true
            },(error)=>{
                console.log(error)
                return false;
            });
            
        }else{
            this.router.navigate(['home'])
            return false;
        }
    } */
    canActivate():Promise<boolean>{
       return new Promise((resolve)=>{
        if(localStorage.getItem('loginToken')){
           
            return this.service.varifyAuthToken().subscribe((response)=>{
                if(response.body.status=="1"){
                    return resolve(true);
                }else{
                    this.router.navigate(['/home'])
                    return resolve(false);
                }
            },(error)=>{
                this.router.navigate(['/home'])
                return resolve(false);
            });

            
        }else{
            this.router.navigate(['/home'])
            return resolve(false);
        }
       })
    }
}