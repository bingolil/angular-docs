import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadRouteService } from './services/base';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./views/home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadRouteService }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
