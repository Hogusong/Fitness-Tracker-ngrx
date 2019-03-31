import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  exports:[
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class ShareModule {}
