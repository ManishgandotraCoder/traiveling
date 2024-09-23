import { Injectable } from '@angular/core';
import { loadGapiInsideDOM, gapi } from 'gapi-script';

@Injectable({
  providedIn: 'root',
})
export class GmailService {
  private clientId = 'CLIENT_ID';
  private apiKey = 'API_KEY';
  private scopes = 'https://www.googleapis.com/auth/gmail.readonly';

  constructor() {
    this.initGapi();
  }

  initGapi() {
    loadGapiInsideDOM().then(() => {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: this.apiKey,
          clientId: this.clientId,
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
          ],
          scope: this.scopes,
        });
      });
    });
  }

  signIn() {
    return gapi.auth2.getAuthInstance().signIn();
  }

  signOut() {
    return gapi.auth2.getAuthInstance().signOut();
  }

  listMessages() {
    return gapi.client.gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
    });
  }
}
