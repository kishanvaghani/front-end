import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[apoldable]'
})
export class HoldableDirective {
  @Output() holdTime:EventEmitter<number> = new EventEmitter();

  state:Subject<string> = new Subject();

  cancel!:Observable<string>;
  constructor(private el:ElementRef) {
    el.nativeElement.style.color="green"
    this.cancel = this.state.pipe(
      filter(v => v==='cancel'),
      tap(v=>{
        console.log('%c Stopped', 'color:yellow');
        this.holdTime.emit(0);
      })
    )
   }
  @HostListener('mouseenter') onMouseEnter(){console.log("lll");}
  @HostListener('mouseleave',["$event"])

  @HostListener('mousedown',["$event"])
  onHold(){
    console.log('%c start', 'color:red');

    this.state.next('start');

    const n =100;

    interval(n).pipe(
      takeUntil(this.cancel),
      tap( v=>{
        this.holdTime.emit(v*n)
      }),
    ).subscribe();
    
  }
}
