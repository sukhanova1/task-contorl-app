import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    AuthModule,
  ]
})
export class FeaturesModule {}
