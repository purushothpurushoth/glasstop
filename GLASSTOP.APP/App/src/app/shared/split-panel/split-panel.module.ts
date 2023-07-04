import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SplitPanelRoutingModule } from './split-panel-routing.module';
import { SplitPanelComponent } from './split-panel.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from 'src/app/app-store/app.reducer';
import { commonLocalStorageSyncReducer } from 'src/app/app-store/app.state';

@NgModule({
  declarations: [SplitPanelComponent],
  imports: [CommonModule, SplitPanelRoutingModule, ReactiveFormsModule,
    StoreModule.forFeature('user', appReducer, {
      metaReducers: [commonLocalStorageSyncReducer],
    }), 
   ],
  
})
export class SplitPanelModule {}