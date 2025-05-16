import { Routes , RouterModule} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ScriptsComponent } from './pages/scripts/scripts.component';
import { NgModule } from '@angular/core';
import { ScriptCreateComponent } from './pages/scripts/script-create/script-create.component';
import { MyscriptsComponent } from './pages/myscripts/myscripts.component';
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'scripts', component: ScriptsComponent},
    {path: 'myscripts', component: MyscriptsComponent},
    {path: 'script-create', component: ScriptCreateComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }