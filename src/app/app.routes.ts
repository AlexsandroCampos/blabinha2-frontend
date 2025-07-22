import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { GameResultsComponent } from './pages/game-results/game-results.component';
import { ChatComponent } from './pages/chat/chat.component';
import { stepGuard } from './core/security/step.guard';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';

export const routes: Routes = [
     {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'home', component: HomeComponent, title: 'Home', canActivate: [stepGuard], data: { step: 0 }},
            { path: 'chat/:id', component: ChatComponent, title: 'Chat', canActivate: [stepGuard], data: { step: 1 } },
        ],
    },
    {
        path: 'chat/:id/results',
        component: GameResultsComponent,
        title: 'GameResults',
        canActivate: [stepGuard], 
        data: { step: 2}
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
        canActivate: [stepGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Cadastro',
        canActivate: [stepGuard]
    },
];
