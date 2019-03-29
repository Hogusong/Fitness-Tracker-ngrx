import { NgModule } from "@angular/core";
import { MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatProgressSpinnerModule, MatTabsModule, MatCardModule, MatSelectModule } from '@angular/material';

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
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule
  ]
})
export class MaterialModule {}