import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { Subject, Observable, interval } from 'rxjs';
import { filter, tap, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appHoldable]'
})
export class HoldableDirective {

  @Output() holdTime:EventEmitter<number> = new EventEmitter();

  state:Subject<string> = new Subject();

  cancel!:Observable<string>;
  constructor(private el:ElementRef) {
    // el.nativeElement.style.opaity=
    
    this.cancel = this.state.pipe(
      filter(v => v==='cancel'),
      tap(v=>{
        console.log('%c Stopped', 'color:yellow');
        this.holdTime.emit(0);
      })
    )
   }
   onEffect(){
      this.el.nativeElement.animate([
        // keyframes
        { opacity: '1' },
        { opacity: '0' }
      ], {
        // timing options
        duration: 1200,
        iterations:1
      });
    }
    // onEffectClose(){
    //   this.el.nativeElement.animate([
    //     // keyframes
    //     { opacity: '0' },
    //     { opacity: '1' }
    //   ], {
    //     // timing options
    //     duration: 1200,
    //     iterations:1
    //   });
    // }    
  @HostListener('mouseup',["$event"])
  onLeave(){
    this.state.next('cancel');
  }

  @HostListener('mouseleave',["$event"])
  onExit(){
    this.state.next('cancel');
  }

  @HostListener('mousedown',["$event"])
  onHold(){
    console.log('%c start', 'color:red');
    this.state.next('start');
    this.onEffect();

    const n =100;

    interval(n).pipe(
      takeUntil(this.cancel),
      tap( v=>{
        console.log("v n",v,n);
        if(v*n>1200){this.state.next('cancel')}
        this.holdTime.emit(v*n)
      }),
    ).subscribe();
    
  }

}
