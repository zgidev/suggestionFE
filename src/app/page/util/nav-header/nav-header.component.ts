import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {

  public username: string;

  constructor(
    private router: Router,
    private userIdle: UserIdleService
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('cofUser');

    //Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart()
      .subscribe(
        res => {
          // console.log('idle countdown!')
          // console.log(res)
        }
      );

    // Start watch when time is up.
    this.userIdle.onTimeout()
      .subscribe(
        () => {
          this.userIdle.stopTimer();
          this.userIdle.stopWatching();

          this.timeout();
        }
      );

    this.userIdle.onIdleStatusChanged()
    .subscribe(
      res => {}
    )

    if (this.username === null) {
      this.logout();
    }
  }

  private timeout() {
    alert('Session expired!');

    localStorage.removeItem('hrPortalUser');
    localStorage.removeItem('token');

    this.router.navigate(['/admin']);
  }

  public logout() {
    localStorage.removeItem('cofUser');
    localStorage.removeItem('token');

    this.router.navigate(['/admin']);
  }

}
