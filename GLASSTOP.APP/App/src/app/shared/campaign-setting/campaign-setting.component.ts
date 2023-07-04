import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'glasstop-campaign-setting',
  templateUrl: './campaign-setting.component.html',
  styleUrls: ['./campaign-setting.component.scss']
})
export class CampaignSettingComponent implements OnInit {

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.times = this.timeGenerator();
  }

  public days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  public settingsForm: FormGroup = this.fb.group({
    timeZone: ['', [Validators.required]],
    days: [[], [Validators.required, Validators.minLength(1)]],
    startTime: '9:00 AM',
    endTime: '5:00 PM'
  })

  public times: string[] = [];

  public timeZones = ["(UTC-12:00) International Date Line West 1",
    "(UTC-12:00) International Date Line West 2",
    "(UTC-12:00) International Date Line West 3",
    "(UTC-12:00) International Date Line West 4",
    "(UTC-12:00) International Date Line West 5",
    "(UTC-12:00) International Date Line West 6"]

  /**
   * Generates an array of times in 30 minute intervals using the moment library in
   * TypeScript.
   */
  public timeGenerator() {
    let hours: string[] = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        let time = moment({ hour: i, minute: j }).format('h:mm A');
        hours.push(time);
      }
    }
    return hours;
  }

  /**
   * Adds or removes a selected day from an array in a settings form.
   * @param {string} selectedDay - a string representing the day that the user has selected to add or
   * remove from the list of selected days.
   */
  public addDay(selectedDay: string) {
    let selectedArray: string[] = this.settingsForm.value.days;
    if (selectedArray.includes(selectedDay)) {
      selectedArray.splice(selectedArray.indexOf(selectedDay), 1);
    } else {
      selectedArray.push(selectedDay);
    }
    this.settingsForm.patchValue({
      days: selectedArray
    })
  }

  onSubmit() {
    console.log(this.settingsForm.value);
  }
}
