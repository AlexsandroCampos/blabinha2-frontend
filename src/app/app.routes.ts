import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { GameResultsComponent } from './pages/game-results/game-results.component';
import { ChatComponent } from './pages/chat/chat.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent, title: 'Home' },
            { path: 'chat', component: ChatComponent, title: 'Chat' },
        ],
    },
    {
        path: 'results',
        component: GameResultsComponent,
        title: 'GameResults',
    },
];
