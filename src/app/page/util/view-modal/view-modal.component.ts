import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SuggestionsService } from '../../../services/suggestions.service';
import { ISuggestion } from './suggestion.interface';
import { ISuggest } from 'src/app/services/service.interface';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.css']
})
export class ViewModalComponent implements OnInit {

  public commentFg: FormGroup;

  public treating = false;
  public errorTreating = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private suggestionsService: SuggestionsService,
    private dialog: MatDialogRef<ViewModalComponent>
  ) { }

  public suggestionData: ISuggest = this.data.item;
  public status = this.data.item.status;

  ngOnInit(): void {

    this.commentFg = this.formBuilder.group(
      {
        comment: ['', [Validators.required]]
      }
    )
  }

  public treatSuggestion() {
    this.errorTreating = false;
    this.treating = true;

    this.suggestionData.comment = this.commentFg.value['comment'];

    // this.dialog.close(
    //   {
    //     data: this.suggestionData.id
    //   }
    // )

    this.suggestionsService.patchSuggestion(this.suggestionData)
      .subscribe(
        res => {
          if (res['code'] === '00') {
            this.dialog.close(
              {
                data: this.suggestionData.id
              }
            );

            this.treating = false;
          } else {
            this.errorTreating = true;
          }
        },
        () => {
          this.treating = false;
          this.errorTreating = true;
        }
      );
  }

  public toTitleCase(str: string) {
    return str.replace(
      /\w\S*/g,
      txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

}
