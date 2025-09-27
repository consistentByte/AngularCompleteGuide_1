import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { type Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [DatePipe, CardComponent],
})
export class TaskComponent {
  task = input.required<Task>();
  private tasksService = inject(TasksService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  onComplete() {
    this.tasksService.removeTask(this.task().id);
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      onSameUrlNavigation: 'reload',
      queryParamsHandling: 'preserve',
    });
  }
}

/*
  this.router.navigate(['./']); 
  load the same route, which can make the resolver run again.

  But this doesn't work out of the box, we have to pass a config object.
  We have to tell angular we are loading path, relative to current activated route.
  {
    relativeTo: this.activatedRoute,
    onSameUrlNavigation: 'reload'
  }

  & set onSameUrlNavigation: 'reload' to reload page and resolvers, as its default behavior is to ignore and it  then won't load any resolvers.


  At the moment in this application, whenever I click complete on one of my tasks, it does not update the UI immediately. If I reload, I can tell that the task actually was deleted, but that's not shown immediately when I click complete.

  The reason for this is that when a task is removed, the resolver which loads my tasks does not execute again.

  After all this setup when we click on sort, and we have queryParams, and then on complete a reload happens and all resolvers are loaded
    our queryParams are cleared, 
    in order to preserve our queryParams, 
    set queryParams: 'preserve'

*/
