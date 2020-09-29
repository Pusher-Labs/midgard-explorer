import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExplorerComponent } from './explorer/explorer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/v1/health',
    pathMatch: 'full',
  },

  // Override routes for custom paths
  {
    path: 'v1/stakers/:address',
    component: ExplorerComponent,
  },
  {
    path: '**',
    component: ExplorerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
