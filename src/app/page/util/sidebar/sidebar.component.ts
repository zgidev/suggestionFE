import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public pathname = '';
  private pageNo = '1';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pathname = window.location.href.split('=')[1].split('&')[0];
    this.pageNo = window.location.href.split('=')[2];
  }

  public routeHandler(route: string) {
    const url = this.router.url;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([`/admin-dashboard`], { queryParams: { page: `${route}`, pageNo: '1' } });
  }

}
