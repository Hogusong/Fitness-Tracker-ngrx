import { NgModule } from "@angular/core";
import { TrainingComponent } from "./training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { CurrTrainingComponent } from "./curr-training/curr-training.component";
import { PastTrainingComponent } from "./past-training/past-training.component";
import { CommonModule } from "@angular/common";
import { ShareModule } from "../share/share.module";

@NgModule({
  declarations: [
    TrainingComponent,
    NewTrainingComponent,
    CurrTrainingComponent,
    PastTrainingComponent
  ],
  imports: [
    CommonModule,
    ShareModule
  ]
})
export class TrainingModule {}