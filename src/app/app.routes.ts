import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { GameResultsComponent } from './pages/game-results/game-results.component';
import { ChatComponent } from './pages/chat/chat.component';
import { stepGuard } from './core/security/step.guard';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent, title: 'Home', canActivate: [stepGuard], data: { step: 0 }},
            { path: 'chat', component: ChatComponent, title: 'Chat', canActivate: [stepGuard], data: { step: 1 } },
        ],
    },
    {
        path: 'results',
        component: GameResultsComponent,
        title: 'GameResults',
        canActivate: [stepGuard], 
        data: { step: 2}
    },
];
