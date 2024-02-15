import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ SecondComponent } from './second/second.component';
import{ ThirdComponent } from './third/third.component';
import{ PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'second',component:SecondComponent},
  {path:'third',component:ThirdComponent},
  {path:'',redirectTo:'second',pathMatch:'full'},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
