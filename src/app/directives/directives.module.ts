import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoldableDirective } from './directives/holdable.directive';



@NgModule({
  declarations: [
    HoldableDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [HoldableDirective]
})
export class DirectivesModule { }
