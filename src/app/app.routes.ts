import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RecognitionFormComponent } from './pages/recognition-form/recognition-form.component';

export const routes: Routes = [
       {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
    },
    {
        path: 'dashboard', component: DashboardComponent
    },
    {
        path: 'recognition-form', component: RecognitionFormComponent
    }
];
