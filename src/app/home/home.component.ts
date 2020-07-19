import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Socialservice } from './../services/social.service';
import { Router } from '@angular/router';
declare var $;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls:['./home.css']
})
export class Home{

    loginForm:Boolean = true;
    registerSubmitError = {status:'',error:''};
    regForm = new FormGroup({
        name : new FormControl('',[Validators.required,Validators.minLength(3)]),
        email : new FormControl('',[Validators.required,Validators.minLength(6)]),
        contact : new FormControl('',[Validators.required,Validators.minLength(10)]),
        password : new FormControl('',[Validators.required,Validators.minLength(3)]),
        cnf_password : new FormControl('',[Validators.required,Validators.minLength(3)])
    })
    loginSubmitError = {status:'',error:''};
    signinForm = new FormGroup({
        loginemail : new FormControl('',[Validators.required,Validators.minLength(6)]),
        loginpassword : new FormControl('',[Validators.required,Validators.minLength(3)])
    })

    constructor(private service:Socialservice,private router:Router){

    }
    changeForm(formType){
        
        if(formType == "login"){
            this.loginForm = true;
        }
        if(formType == "signup"){
            this.loginForm = false;
        }
    }
    doLogin(){
        let email = this.signinForm.value.loginemail;
        let password = this.signinForm.value.loginpassword;

        if(email == ''){
            this.loginSubmitError = {
                'status':'1',
                'error':'Email is required'
            }
            return false;
        }

        if(password == ''){
            this.loginSubmitError = {
                'status':'1',
                'error':'Password is required'
            }
            return false;
        }
        let loginData = {email,password};
        this.service.login(loginData).subscribe((succRes)=>{
            console.log(succRes)
            if(succRes.status == 200){
                let resData = succRes.body.res;
                let name = resData.name;
                let email = resData.email;
                let loginToken = resData.headers.get('x-auth');
                let userid = resData._id;
                localStorage.setItem('name',name);
                localStorage.setItem('email',email);
                localStorage.setItem('loginToken',loginToken);
                localStorage.setItem('userid',userid);
                this.router.navigate(['/chat']);
            }else{
                this.loginSubmitError = {
                    'status':'1',
                    'error':'Invalid Login'
                }
                return false;
            }
        },(error)=>{
            this.loginSubmitError = {
                'status':'1',
                'error':'Some problem at server. Please try again'
            }
            console.log(error);
            return false;
            //console.log(error);
        })
    }
    regUser(){
        let uname = this.regForm.value.name;
        let email = this.regForm.value.email;
        let contact = this.regForm.value.contact;
        let password = this.regForm.value.password;
        let cnf_password = this.regForm.value.cnf_password;
        if(uname == ''){
            this.registerSubmitError = {
                'status':'1',
                'error':'Name is required'
            }
            return false;
        }
        if(email == ''){
            this.registerSubmitError = {
                'status':'1',
                'error':'Email is required'
            }
            return false;
        }
        
        if(contact == ''){
            this.registerSubmitError = {
                'status':'1',
                'error':'Contact is required'
            }
            return false;
        }
        if(password == ''){
            this.registerSubmitError = {
                'status':'1',
                'error':'Password is required'
            }
            return false;
        }
        if(cnf_password == ''){
            this.registerSubmitError = {
                'status':'1',
                'error':'Confirm Password is required'
            }
            return false;
        }

        if(password!=cnf_password){
            this.registerSubmitError = {
                'status':'1',
                'error':'Password and Confirm Password should be same'
            }
            return false;
        }
        
        let formData = {
            name:uname,email,contact,password
        }
        this.service.signup(formData).subscribe((data)=>{
         let httpStatus = data;
         if(httpStatus.body.status=="1"){
            this.registerSubmitError = {
                'status':'success',
                'error':'You are registered successfully. Please login into your account'
            }
            this.loginForm = true;
            return false;
         }else{
            this.registerSubmitError = {
                'status':'1',
                'error':httpStatus.body.res
            }
            return false;
         }
        },(error:Response)=>{
            if(error.status==0){
                this.registerSubmitError = {
                    'status':'1',
                    'error':'Server is not reachable. Please try again'
                }
                return false;
            }
        })
        console.log(this.regForm.value)
    }




}