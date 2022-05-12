import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { process } from '@progress/kendo-data-query';

import { ViewModalComponent } from '../util/view-modal/view-modal.component';
import { SuggestionsService } from '../../services/suggestions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public sugData: any = [];
  private len = 0;

  public data = [
    {
      title: 'Dirty male toilet',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore`,
      dateLogged: '07/01/2022'
    },
    {
      title: 'Small kitchennet',
      description: `Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore`,
      dateLogged: '17/01/2022'
    },
    {
      title: 'Faulty microwave',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.`,
      dateLogged: '27/01/2022'
    }
  ]

  public actionFg: FormGroup;

  public pageParam = '';
  public pageNo = '1';

  public status = 'pending';

  public selectedSuggestions = [];

  public paginatedSuggestions = [];
  public paginatedBuffer = [];
  public pageContent = [];
  public pageSize = 20;

  public treating: boolean = false;
  public checkboxData = [];
  public checkall = false;

  public reportFilter = [
    {
      id: '1',
      month: 'January'
    },
    {
      id: '2',
      month: 'February'
    },
    {
      id: '3',
      month: 'March'
    },
    {
      id: '4',
      month: 'April'
    },
    {
      id: '5',
      month: 'May'
    },
    {
      id: '6',
      month: 'June'
    },
    {
      id: '7',
      month: 'July'
    },
    {
      id: '8',
      month: 'August'
    },
    {
      id: '9',
      month: 'September'
    },
    {
      id: '10',
      month: 'October'
    },
    {
      id: '11',
      month: 'November'
    },
    {
      id: '12',
      month: 'December'
    }
  ]

  public reportGroup: any[];
  public downloadData: any[] = [];
  public downloadDataList: any[] = [];
  public downloadFileName = 'Staff_Suggestions-' + Date.now().toString() + '.xlsx';

  constructor(
    private fb: FormBuilder,
    private suggestionsService: SuggestionsService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    try {
      this.pageParam = window.location.href.split('=')[1].split('&')[0];

      this.pageNo = window.location.href.split('=')[2]

      this.status = this.pageParam.toLowerCase();

    } catch (error) {
      this.pageParam = '';
    }

    this.getSuggestions();

    this.actionFg = this.fb.group(
      {
        action: ['', [Validators.required]]
      }
    )
  }

  public toInt(page: string) {
    return parseInt(page);
  }

  public processExcel() {
    this.downloadDataList = [];

    for (let i = 0; i < this.len; i++) {
      const element = this.sugData[i];

      const pushed = {
        title: element['title'],
        description: element['description'],
        status: element['status'],
        comment: element['comment'],
        dateLogged: element['dateLogged'],
        dateTreated: element['dateTreated']
      }

      this.downloadDataList.push(pushed);
    }

    // Tie excel export data to result data
    this.downloadData = process(this.downloadDataList, {
      group: this.reportGroup
    }).data;
  }

  public selectChangeHandler(e: Event) {
    const value = e.target['value'];

    console.log('val: ', value);

    if (value === 'all') {
      this.processExcel();
    } else {
      this.downloadDataList = [];

      for (let i = 0; i < this.len; i++) {
        const element = this.sugData[i];

        const dateLogged = element['dateLogged'].split('/')[0];

        if (dateLogged === value) {

          // console.log('dateLogged: ', element)

          const pushed = {
            title: element['title'],
            description: element['description'],
            status: element['status'],
            comment: element['comment'],
            dateLogged: element['dateLogged'],
            dateTreated: element['dateTreated']
          }

          this.downloadDataList.push(pushed);
        }
      }

      console.log('list: ', this.downloadDataList);

      // Tie excel export data to result data
      this.downloadData = process(this.downloadDataList, {
        group: this.reportGroup
      }).data;
    }
  }

  private chunk2 (arr: any[], size: number) {
    return arr.reduce(
      (acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []
    );
  }

  private getSuggestions() {
    this.pageContent = [];

    this.suggestionsService.getSuggestions(this.status)
      .subscribe(
        res => {
          this.sugData = res['data'];

          this.len = this.sugData.length;

          // Process Excel Export
          this.processExcel();

          for (let i = 0; i < this.sugData.length; i++) {
            const element = this.sugData[i];

            this.checkboxData.push(
              {
                id: element.id,
                checked: false,
                title: element.title,
                description: element.description,
                status: element.status,
                dateLogged: element.dateLogged,
                dateTreated: element.dateTreated
              }
            );
          }

          this.paginatedSuggestions = this.chunk2(this.checkboxData, this.pageSize);

          try {
            const thePage = parseInt(this.pageNo) - 1;

            this.pageContent = this.paginatedSuggestions[thePage];

          } catch (error) {

            this.pageContent = this.paginatedSuggestions[0];

          }
        }
      )
  }

  public toTitleCase(str: string) {
    return str.replace(
      /\w\S*/g,
      txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  public viewHandler(index: number) {
    const item = this.sugData[index];

    const dialogRef = this.dialog.open( ViewModalComponent, {
      data: {
        item,
        index
      },
      height: '520px',
      width: '800px'
    });

    dialogRef.afterClosed()
      .subscribe(
        res => {
          const id = res['data'];

          console.log('close: ', res);

          this.popItem(id);
        }
      )
  }

  public treatSuggestion() {
    this.treating = true;

    for (let i = 0; i < this.selectedSuggestions.length; i++) {
      const suggestion = this.selectedSuggestions[i];

      this.suggestionsService.patchSuggestion(suggestion)
        .subscribe(
          res => {
            this.selectedSuggestions.splice(i, 1);
            this.pageContent.splice(i, 1);

            // Remove treated items from the paginated content
            this.popItem(suggestion.id);

            this.treating = false;
          },
          () => this.treating = false
        );
    }
  }

  popItem(id: number) {
    console.log('ID: ', id);

    console.log('checkeddata: ', this.checkboxData);

    for (let i = 0; i < this.checkboxData.length; i++) {
      const element = this.checkboxData[i];

      if (element.id === id) {

        console.log('checkeddata: ', this.checkboxData);

        this.checkboxData.splice(i, 1);

        console.log('checkeddata: ', this.checkboxData);

        // repopulate paginationSuggestion array
        this.paginatedSuggestions = this.chunk2(this.checkboxData, this.pageSize);

        const thePage = parseInt(this.pageNo) - 1;

        this.pageContent = this.paginatedSuggestions[thePage];
      }
    }
  }

  private selectionBuilder() {
    this.selectedSuggestions = [];

    for (let i = 0; i < this.pageContent.length; i++) {
      const element = this.pageContent[i];

      if (element['checked']) {
        this.selectedSuggestions.push(
          {
            id: element.id,
            title: element.title,
            description: element.description,
            status: element.status,
            dateLogged: element.dateLogged,
            dateTreated: element.dateTreated
          }
        )
      }
    }
  }

  public checkChangeHandler(event: Event, index: number) {
    const id = event.target['id'].split('-')[1];

    if (id === 'all') {
      if (event.target['checked']) {
        for (let i = 0; i < this.pageContent.length; i++) {

          this.pageContent[i]['checked'] = true;

        }
      } else {
        for (let i = 0; i < this.pageContent.length; i++) {
          this.pageContent[i]['checked'] = false;
        }
      }
    } else {
      if (event.target['checked']) {

        this.pageContent[index]['checked'] = true;

      } else {

        this.pageContent[index]['checked'] = false;

      }
    }

    this.selectionBuilder();

    this.checkall = this.checkAllChecker();
  }

  private checkAllChecker(): boolean {
    for (let i = 0; i < this.pageContent.length; i++) {
      const element = this.pageContent[i];

      if (!element['checked']) {
        return false;
      }
    }

    return true;
  }

  public onSubmit() {
    console.log(this.actionFg.get('action').value)
  }

  public routeHandler(index: number) {
    const page = (index + 1).toString();

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([`/admin-dashboard`], { queryParams: { page: `${this.pageParam}`, pageNo: `${page}` } });
  }

}
