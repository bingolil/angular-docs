import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadRouteService } from './services/base/preload-route.service';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadRouteService })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
