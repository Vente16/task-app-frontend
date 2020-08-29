import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
   {
     path: '',
     component: LoginComponent
    },
   {
      path: 'tasks',
      component: TasksComponent
    },
    {
      path: '**',
      component: LoginComponent
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
