import { IEmailTemplate } from 'src/app/app.interface';

export const emailTemplates: IEmailTemplate[] = [
  {
    id: '1',
    title: 'Email 1',
    timeline: {
      desc: 'Will be sent on',
      day: 'Day 1',
    },
    desc: '(After starting the campaign, Day 1 email will be sent immediately to the added employees)',
    emailMeta: '',
    companyName: 'Ideas2it',
    variables: ['{{full-name}}', '{{first-name}}'],
    subject: 'feedback form',
    isSubjectDisabled: false,
    body: {
      greeting: 'Hey <span style="color: #2563EB">{{full-name}}</span>, <br>',
      content:
        '<br>I hope this email finds you well. As a valued member of our team, your opinion about our company is incredibly valuable to us. ' +
        'We would like to request that you take a few minutes to provide us with your feedback or review of the company.<br><br> Your feedback ' +
        'will help us understand how we can improve our services and make the company a better place to work. We value your input and appreciate... <br>' +
        'Please take a few minutes to complete the survey by clicking on the following link: <a href="https://ideas2it.com">{{review-link}}</a>',
      signature: '<br><br> Regards,<br> {{user-name}}',
    },
  },
  {
    id: '2',
    title: 'Email 2',
    timeline: {
      desc: 'Send After:',
      day: "3 Day's",
    },
    desc: '(Email 2 will be sent 3 days after the Email 1)',
    emailMeta: '<<Sending as a same thread>>',
    companyName: 'Ideas2it',
    variables: ['{{full-name}}', '{{first-name}}'],
    subject: 'feedback form',
    isSubjectDisabled: true,
    body: {
      greeting: 'Hey <span style="color: #2563EB">{{full-name}}</span>, <br>',
      content:
        '<br> I hope this email finds you well. I am writing to follow up on my previous email regarding your feedback on our company.' +
        'We understand that you are busy, but we would greatly appreciate your participation in our survey.<br><br>' +
        'Please take a few minutes to complete the survey by clicking on the following link: <a href="https://ideas2it.com">{{review-link}}</a>',
      signature: '<br><br> Regards,<br> {{user-name}}',
    },
  },
  {
    id: '3',
    title: 'Email 3',
    timeline: {
      desc: 'Send After:',
      day: "2 Day's",
    },
    desc: '(Email 3 will be sent 2 days after the Email 2)',
    emailMeta: '<<Sending as a same thread>>',
    companyName: 'Ideas2it',
    variables: ['{{full-name}}', '{{first-name}}'],
    subject: 'feedback form',
    isSubjectDisabled: true,
    body: {
      greeting: 'Hey <span style="color: #2563EB">{{full-name}}</span>, <br>',
      content:
        '<br> This is the final reminder to complete the survey about your feedback on our company. If you have already completed the survey, thank you for your participation.' +
        ' If not, please take a few minutes to do so by clicking on the following link:<br><a href="https://ideas2it.com">{{review-link}}</a>',
      signature: '<br><br> Regards,<br> {{user-name}}',
    },
  },
];
