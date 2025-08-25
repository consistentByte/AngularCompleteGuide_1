import { Component, OnInit, DestroyRef, inject, signal, effect } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit {
  //Use this way when setting string values for few choices to get error on typo
  currentStatus = signal<'online' | 'offline' | 'unknown'>('online');
  
  //Alternative to ngOnDestroy
  private destroyRef = inject(DestroyRef) // can also inject it using constructor.
  // private interval?: ReturnType<typeof setInterval>;

  constructor() {
    // Listen for changes in a signal values inside component ts => effect.
    effect(() => {
      console.log(this.currentStatus());
    });

    const tasks = [1,2,3,5]; 

    effect((onCleanup) => {
      const tasks_ = tasks;
      const timer = setTimeout(() => {
        console.log(`Current number of tasks: ${tasks_.length}`);
      }, 1000);
      onCleanup(() => {
        clearTimeout(timer);
      });
    });
  }

  ngOnInit() {
    const interval = setInterval(() => {
      const rnd = Math.random(); // 0-1
      if (rnd < 0.5) {
        this.currentStatus.set('online') ;
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline') ;
      } else {
        this.currentStatus.set('unknown') ;
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    })
  }
}
