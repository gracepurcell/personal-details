import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { StrategyComponent } from './pages/strategy/strategy.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'details'
      },
      {
        path: 'details',
        component: PersonalDetailsComponent
      },
      {
        path: 'strategy',
        component: StrategyComponent
      }
    ]
  },
];
