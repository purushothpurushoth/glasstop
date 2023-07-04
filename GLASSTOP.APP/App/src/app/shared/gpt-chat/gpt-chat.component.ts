import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CHAT_GPT_ROLES } from 'src/app/app.constants';
import { GptChatService } from 'src/app/service/gpt-chat/gpt-chat.service';

@Component({
  selector: 'glasstop-gpt-chat',
  templateUrl: './gpt-chat.component.html',
  styleUrls: ['./gpt-chat.component.scss'],
})
export class GptChatComponent implements OnInit {
  public messages: any = [];
  public isLoading = false;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  constructor(
    private chatService: GptChatService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.chatService
      .initChatBehaviour()
      .subscribe(
        (data: any) =>
          data?.chatHistory &&
          (this.messages = data.chatHistory) &&
          (this.isLoading = false)
      );
  }

  public sendMessage(value: string) {
    this.isLoading = true;
    console.log('value', value);
    const chatHistory = [...this.messages];
    this.messages.push({ role: CHAT_GPT_ROLES.USER, content: value });
    this.scrollToBottom();
    this.chatService.sendUserResponse(value, chatHistory).subscribe((data) => {
      this.messages = data.chatHistory;
      this.isLoading = false;
      this.scrollToBottom();
    });
    return true;
  }

  private scrollToBottom(): void {
    const container = this.scrollContainer.nativeElement;
    this.renderer.setStyle(container, 'scroll-behavior', 'smooth');
    container.scrollTop = container.scrollHeight;
  }
}
