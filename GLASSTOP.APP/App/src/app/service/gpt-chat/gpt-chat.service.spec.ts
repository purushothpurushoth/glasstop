import { TestBed } from '@angular/core/testing';

import { GptChatService } from './gpt-chat.service';

describe('GptChatService', () => {
  let service: GptChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GptChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
