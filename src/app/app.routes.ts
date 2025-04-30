import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { GameResultsComponent } from './pages/game-results/game-results.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
        ],
        title: 'Home',
    },
    {
        path: 'results',
        component: GameResultsComponent,
        title: 'GameResults',
    },
];
