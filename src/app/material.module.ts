import { NgModule } from "@angular/core";
import { MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatSidenavModule } from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule
  ]
})
export class MaterialModule {}