import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExplorerComponent } from './explorer/explorer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/v1/health',
    pathMatch: 'full',
  },
  {
    path: ':apiVersion',
    children: [
      {
        path: ':apiEndpoint',
        component: ExplorerComponent,
        children: [
          {
            path: ':apiEndpoint2',
            component: ExplorerComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
