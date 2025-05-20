import { Routes , RouterModule} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ScriptsComponent } from './pages/scripts/scripts.component';
import { NgModule } from '@angular/core';
import { ScriptCreateComponent } from './pages/scripts/script-create/script-create.component';
import { MyscriptsComponent } from './pages/myscripts/myscripts.component';
import { ScriptEditComponent } from './components/script-edit/script-edit.component';
import { HomeLoggedComponent } from './pages/home-logged/home-logged.component';
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'scripts', component: ScriptsComponent},
    {path: 'myscripts', component: MyscriptsComponent},
    {path: 'script-create', component: ScriptCreateComponent},
    {path: 'script-edit/:id', component: ScriptEditComponent},
    {path: 'home-logged', component: HomeLoggedComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }