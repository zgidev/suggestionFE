import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { baseurl } from './baseurl';
import { ISuggest, ISuggPost } from './service.interface';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {
  private suggestionUrl = baseurl + '/Suggestions';

  constructor(private http: HttpClient) { }

  public patchSuggestion(payload: ISuggest) {
    const httpOptions = this.httpClientHeaders();

    return this.http.patch(this.suggestionUrl, payload, httpOptions);
  }

  public getSuggestions(status = 'pending') {
    const httpOptions = this.httpClientHeaders();
    const url = `${this.suggestionUrl}/${status}`;

    return this.http.get(url, httpOptions);
  }

  public postSuggestion(payload: ISuggPost) {
    const httpOptions = this.httpClientHeaders();

    return this.http.post('this.suggestionUrl', payload, httpOptions);
  }

  private httpClientHeaders() {
    return {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json'
        }
      )
    }
  }
}
