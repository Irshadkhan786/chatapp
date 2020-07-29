import { Websocket } from './../services/websocket.service';
import { Component,OnInit } from '@angular/core';
declare var $;
@Component({
    selector: 'chat-app',
    templateUrl: './chat.component.html'
})
export class Chat implements OnInit{

    private email:string;
    private username:string;
    private userimage:string;
    private userToken:string;
    private userAutoId:string;
    constructor(private socket:Websocket){
        this.email = localStorage.getItem('email');
        this.username = localStorage.getItem('name');
        this.userimage = '';
        this.userToken = localStorage.getItem('loginToken');
        this.userAutoId = localStorage.getItem('userid');
    }
    ngOnInit(){
       let userdata = {
            'email':this.email,
            'username':this.username,
            'userimage':'',
            'userToken':this.userToken,
            'userAutoId':this.userAutoId,
            'makeOnline': "0"
        }
        this.socket.listen('connect').subscribe((data)=>{
            this.socket.emit('setOnlineUser',userdata);
        })
        
    }
}