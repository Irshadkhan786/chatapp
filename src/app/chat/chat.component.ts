import { Component } from '@angular/core';
/* @Component({
    selector:'chat-app',
    templateUrl:'./chat.component.html'
}) */
declare var $;
@Component({
    selector: 'chat-app',
    templateUrl: './chat.component.html'
})

export class Chat{

    constructor(){
        console.log('I am clicked');
    }
}