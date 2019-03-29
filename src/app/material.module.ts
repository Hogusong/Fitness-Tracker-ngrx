import { NgModule } from "@angular/core";
import { MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatProgressSpinnerModule, MatTabsModule } from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ]
})
export class MaterialModule {}