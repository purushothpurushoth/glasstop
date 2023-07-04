import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { behaviourPrompt } from 'src/mock/gpt-chat-behaviour-prompt';

@Injectable({
  providedIn: 'root',
})
export class GptChatService {
  constructor(private http: HttpClient) {}

  /**
   * @description Saves the User details.
   * @param user
   * @returns
   */
  public initChatBehaviour() {
    const requestURL = 'https://i8fgmh0ded.execute-api.us-east-2.amazonaws.com/v1/Prompt';
    const reqBody = {
      role: 'system',
      prompt: behaviourPrompt,
      temperature: 0,
    };
    return this.http.post<any>(requestURL, reqBody);
  }

  public sendUserResponse(userResponse: any, chatHistory: any) {
    const requestURL =
      'https://i8fgmh0ded.execute-api.us-east-2.amazonaws.com/v1/Prompt';
    const reqBody = {
      role: 'user',
      prompt: userResponse,
      temperature: 0,
      chatHistory: chatHistory
    };
    return this.http.post<any>(requestURL, reqBody);
  }
}
