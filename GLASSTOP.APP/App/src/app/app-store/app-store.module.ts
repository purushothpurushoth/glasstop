import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('appState', appReducer)],
})
export class AppStoreModule {}
