import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ISuggPost } from '../../services/service.interface';
import { SuggestionsService } from '../../services/suggestions.service';

@Component({
  selector: 'app-initiate',
  templateUrl: './initiate.component.html',
  styleUrls: ['./initiate.component.css']
})
export class InitiateComponent implements OnInit {

  public suggestionFomGroup: FormGroup;
  public postError: boolean = false;

  // private payload: IPayload;

  constructor(
    private fb: FormBuilder,
    private suggestionsService: SuggestionsService
  ) { }

  ngOnInit(): void {
    this.suggestionFomGroup = this.fb.group(
      {
        title: ['', [Validators.required]],
        suggestion: ['', [Validators.required]]
      }
    )
  }

  public onSubmit() {
    this.postError = false;
    const payload: ISuggPost = {
      title: this.suggestionFomGroup.get('title').value,
      description: this.suggestionFomGroup.get('suggestion').value
    }

    this.suggestionsService.postSuggestion(payload)
      .subscribe(
        res => {
          if (res['code'] === '00') {
            alert('Suggestion submitted successfully!');

            this.suggestionFomGroup.reset();
          }
        },
        () => {
          console.log('error!');
          this.postError = true;
        }
      )
  }

}
