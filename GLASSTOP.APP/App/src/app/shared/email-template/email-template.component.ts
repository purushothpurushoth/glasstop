import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective
} from '@angular/forms';
import { VirtualElement } from '@floating-ui/core';
import { Store } from '@ngrx/store';
import { Editor, Toolbar } from 'ngx-editor';
import { NodeSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { asyncScheduler, fromEvent, take, throttleTime } from 'rxjs';
import { selectUserInContext } from 'src/app/app-store/app.selector';
import { BubblePosition, IEmailTemplate, IUser } from 'src/app/app.interface';
import { SubscriptionBundle } from 'src/app/utils/subscription-bundle';

import { computePosition, offset } from '@floating-ui/dom';

@Component({
  selector: 'glasstop-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class EmailTemplateComponent implements OnInit, OnDestroy {

  private _subs: SubscriptionBundle = new SubscriptionBundle();
  public editor: Editor = new Editor();
  public user: IUser | null = null;
  public toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'text_color'],
    ['ordered_list', 'bullet_list'],
    ['align_left', 'align_center', 'align_right', 'align_justify', 'link'],
  ];

  @Input()
  public template: IEmailTemplate | null = null;
  @Input()
  public index: number = 0;
  public parentForm!: FormGroup;
  @ViewChild("redirectButton") redirectButton!: ElementRef<any>;
  public posLeft: string = "";
  public posTop: string = "";
  public showMenu = false;
  private isAnchorTag = false;
  private link = "";
  private view = this.editor.view;
  public subjectCursorPos: number = 0;

  constructor(private store: Store, private parent: FormGroupDirective, private renderer: Renderer2) { }

  public ngOnInit() {
    this.parentForm = (this.parent.form.controls['emailTemplates'] as any)[
      'controls'
    ][this.index];
    this.initTemplateDetails();
  }

  /**
   * @description inits the template details.
   */
  public initTemplateDetails() {
    if (this.template) {
      this.parentForm.patchValue({
        SenderEmailId: this.user?.email,
        MailSubject: this.template.companyName + ' feedback form',
        MailBody: this.getEmailBody(),
        MailTemplateId: this.template.id || '',
      });
      this._subs.add(
        this.store
          .select(selectUserInContext)
          .pipe(take(1))
          .subscribe((user) => {
            this.user = user;
            if (this.user) {
              const signature = this.user.firstName
                ? '<br><br> Regards,<br>' + this.user.firstName
                : '';
              this.parentForm.patchValue({
                SenderEmailId: this.user.email,
                MailBody: this.getEmailBody(null, null, signature),
              });
            }
          }),
        this.editor.update.subscribe((view) => {
          this.updateView(view);
        }),
        fromEvent(window, 'resize').pipe(
          throttleTime(500, asyncScheduler, { leading: true, trailing: true }),
        ).subscribe(() => {
          this.view && this.updateView(this.view);;
        })
      );
    }
  }

  /**
   * @description Inserts the selecetd variable into email body.
   * @param {string} variable
   */
  public setVariableInBody(variable: string) {
    const spanElement = document.createElement('span');
    spanElement.textContent = variable;
    spanElement.style.color = '#2563EB';
    this.editor.commands.insertHTML('&nbsp;' + spanElement.outerHTML + '&nbsp;').exec();
  }

  /**
   * @description Method to handle deletion of selected variable in the email body.
   * @param {any} event 
   */
  public keyDownHandlerForBody(event: any) {
    if (event.code === 'Backspace' || event.code === 'Delete') {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const currentNode = range.startContainer.parentNode;
        if (currentNode && currentNode.nodeName === 'SPAN' && currentNode.parentNode != null) {
          currentNode.parentNode.removeChild(currentNode);
          event.preventDefault();
        }
      }
    }
  }

  /**
   * @description Inserts the selecetd variable into email subject.
   * @param {any} event
   */
  public setVariableInSubject(event: any) {
    let varName = (<HTMLInputElement>event.target).value + ' ';
    let value = this.parentForm.get('MailSubject')?.value;
    if (value) {
      const valueArr = value.split('');
      this.subjectCursorPos > 0 && (varName = ' ' + varName);
      valueArr.splice(this.subjectCursorPos, 0, varName);
      value = valueArr.join('');
      this.parentForm.patchValue({
        MailSubject: value,
      });
    } else {
      this.parentForm.patchValue({
        MailSubject: varName,
      });
    }
    event.target.value = '';  // To reset variable dropdown value
  }

  /**
   * @description Method to get cursor position of the variable in email subject
   * @param {any} event 
   */
  public getSubjectCursorPos(event: any) {
    const selectionStart = event?.target?.selectionStart;
    if (selectionStart >= 0) {
      this.subjectCursorPos = selectionStart;
    }
  }

  /**
   * @description Method to handle deletion of variable in email subject
   * @param {any} event 
   */
  public keyDownHandlerForSubject(event: any) {
    if (this.template) {
      const subjectLine = event.target.value;
      const cursorPosition = event.target.selectionStart;
      if (cursorPosition > -1) {
        const atPosition = subjectLine.lastIndexOf('{', cursorPosition);
        if (atPosition > -1) {
          const strFound = subjectLine.substring(atPosition - 1, cursorPosition);
          if (this.template.variables.indexOf(strFound) > -1) {
            event.preventDefault();
            if (event.code === 'Backspace' || event.code === 'Delete') {
              let result = subjectLine.substring(0, atPosition - 1) + subjectLine.substring(cursorPosition);
              this.parentForm.patchValue({
                MailSubject: result,
              });
            }
          }
        }
      }
    }
  }

  /**
  *
  * @description Constructs the email body
  * @param greeting
  * @param content
  * @param signature
  * @returns email body if template is present else returns empty string.
  */
  private getEmailBody(
    greeting?: string | null,
    content?: string | null,
    signature?: string | null
  ) {
    if (this.template) {
      greeting && (this.template.body.greeting = greeting);
      content && (this.template.body.content = content);
      signature && (this.template.body.signature = signature);
      return (
        this.template?.body.greeting +
        this.template?.body.content +
        this.template?.body.signature
      );
    }
    return '';
  }

  /**
   * @description Checks if a mouse event target is an anchor tag and sets a link variable
   * accordingly.
   * @param {MouseEvent} e - The parameter "e" is an event object that is passed to the function. It contains
   * information about the event that triggered the function, such as the type of event, the target
   * element that triggered the event, and any additional data related to the event.
   * @returns nothing (undefined) if the condition `if (e.target.nodeName === 'A')` is not met, and the
   * function ends with `this.hide();`.
   */
  mouseEventToTriggerRedirectButton(event: MouseEvent) {
    this.isAnchorTag = false;
    const element = (event.target) as (EventTarget & { nodeName: string, href: string });
    if (element.nodeName === 'A') {
      this.link = element.href;
      this.isAnchorTag = true;
      this.view && this.updateView(this.view);;
    } else {
      this.hide();
    }
  }

  /**
   * Checks if the cursor is in an anchor tag and updates accordingly.
   */
  keyboardEventToTriggerRedirectButton() {
    this.isAnchorTag = this.isCursorInAnchorTag();
    this.view && this.updateView(this.view);;
  }

  /**
   * @description Checks if the cursor is currently inside an anchor tag.
   * @returns a boolean value indicating whether the cursor is currently inside an anchor tag or not.
   */
  private isCursorInAnchorTag(): boolean {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const cursorNode = range.startContainer.parentNode as ParentNode & { href: string };
      this.link = cursorNode.href;
      return (cursorNode!.nodeName === "A");
    }
    return false;
  }

  /**
   * @description Hides a menu by setting the showMenu property to false.
   */
  private hide(): void {
    this.showMenu = false;
  }

  /**
   * @description Sets the "showMenu" property to true.
   */
  private show(): void {
    this.showMenu = true;
  }

  /**
   * @description Calculates the position of a bubble element relative to the current selection in an
   * editor view.
   * @param {EditorView} view - An instance of the EditorView class, which represents the editor's view
   * and provides access to its state and methods.
   * @returns an object with the properties `left` and `top`, which represent the calculated position
   * of a bubble element relative to the selected text in an editor view.
   */
  private async calculateBubblePosition(view: EditorView): Promise<BubblePosition> {
    const { state: { selection } } = view;
    const { from, to } = selection;

    const start = view.coordsAtPos(from);
    const end = view.coordsAtPos(to);
    const selectionElement: VirtualElement = {
      getBoundingClientRect() {
        if (selection instanceof NodeSelection) {
          const node = view.nodeDOM(from) as HTMLElement;
          return node.getBoundingClientRect();
        }
        const { top, left } = start;
        const { bottom, right } = end;
        return {
          x: left,
          y: top,
          top,
          bottom,
          left,
          right,
          width: right - left,
          height: bottom - top,
        };
      }
    };
    const bubbleEl = this.redirectButton.nativeElement;
    const { x: left, y: top } = await computePosition(selectionElement, bubbleEl, {
      placement: 'top',
      middleware: [
        offset(5),
      ],
    });
    return {
      left,
      top,
    };
  }

  /**
   * Checks if a redirect button can be shown in an editor view.
   * @param {EditorView} view - EditorView object, which represents the current state of the editor and
   * provides methods to interact with it.
   * @returns The function `canShowRedirectButton` returns a boolean value. It returns `false` if the
   * editor view does not have focus or if the current selection is not an anchor tag. Otherwise, it
   * returns `true`.
   */
  private canShowRedirectButton(view: EditorView): Boolean {
    (!this.view.hasFocus() || !this.isAnchorTag) && this.hide()
    return (!this.view.hasFocus() || !this.isAnchorTag) ? false : true;
  }

  /**
   * Updates the view of an editor and calculates the position of a redirect button to be
   * shown or hidden based on certain conditions.
   * @param {EditorView} view - EditorView object, which is likely a reference to the current editor
   * view being displayed.
   * @returns If `canShowRedirectButton` is false, the function returns without any value. If
   * `canShowRedirectButton` is true, the function calculates the bubble position and then shows the
   * bubble. No value is explicitly returned in this case.
   */
  private updateView(view: EditorView): void {
    const canShowRedirectButton = this.canShowRedirectButton(view);
    if (!canShowRedirectButton) {
      this.hide();
      return;
    }
    this.calculateBubblePosition(this.view).then(({ top, left }) => {
      if (!this.canShowRedirectButton) {
        this.hide();
      } else {
        this.posLeft = left + "px";
        this.posTop = top + "px";
        this.show();
      }
    });
  }

  redirect() {
    window.open(this.link)
  }

  public ngOnDestroy() {
    this._subs.unsubscribe();
  }

}
