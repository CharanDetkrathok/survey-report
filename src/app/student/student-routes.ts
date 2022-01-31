import { Routes } from '@angular/router';
import { BachelorThaiComponent } from './bachelor-thai/bachelor-thai.component';
import { BachelorEngComponent } from './bachelor-eng/bachelor-eng.component';
import { AuthGuardGuard } from '../services/auth-guard.guard';

export const routes: Routes = [
    {
      path: 'bachelor-thai',
      component: BachelorThaiComponent,
      canActivate: [AuthGuardGuard]
    },
    {
      path: 'bachelor-eng',
      component: BachelorEngComponent,
      canActivate: [AuthGuardGuard]
    }
  ];
  