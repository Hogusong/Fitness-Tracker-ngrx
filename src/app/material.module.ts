import { NgModule } from "@angular/core";
import { MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatProgressSpinnerModule } from '@angular/material';

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
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {}