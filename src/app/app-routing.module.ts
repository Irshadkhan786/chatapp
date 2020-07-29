
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*== importing component ==*/
import {Home} from './home/home.component';
import {Chat} from './chat/chat.component';
import {About} from './chat/about.component';

/*== import service ===*/
import { LoginGaurd } from './services/login-gaurd.service'
const routes: Routes = [
  {path:'',component:Home},
  {path:'chat',component:Chat,canActivate:[LoginGaurd]},
  {path:'about',component:About},
  {path:'**',component:Home},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent = [
Home,Chat,About
]


