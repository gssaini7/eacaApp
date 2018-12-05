import { Component, ViewChild } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
import { CrudServices } from '../../../services/crudservice';
import { CalendarComponent } from "ionic2-calendar/calendar";


@Component({
    selector: 'page-attendance',
    templateUrl: 'attendance.html'
})
export class AttendancePage {
    @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
    msg: string;
    loading: Loading;
    monthtitle: string;
    eventSource;
    viewTitle;

    isToday: boolean;
    calendar = { 
        mode: 'month',
        queryMode: 'remote',
        currentDate: new Date(),
    };


    constructor(private _crud: CrudServices, public loadingCtrl: LoadingController) {
        this.GetAttendance();
  }

  GetAttendance() {
      this.msg = "";
      this.showLoading();
      this.eventSource = [];
      var studentid = this._crud.getStorage("currentstudentid");

      //var studentid = localStorage.getItem("currentstudentid");
      this.loading.present().then(() =>
          this._crud.get("appdetail/GetAttendanceDetail?id=" + studentid).subscribe(records => {
              records.forEach(i => {
              var date = i.attendancedate;
              var startTime = new Date(date);
              startTime = new Date(Date.UTC(startTime.getUTCFullYear(), startTime.getUTCMonth(), startTime.getUTCDate()));
              var endTime = new Date(date);
              endTime = new Date(Date.UTC(endTime.getUTCFullYear(), endTime.getUTCMonth(), endTime.getUTCDate()));
              endTime.setDate(endTime.getDate() + 1);

              this.eventSource.push({
                  title: i.status,
                  startTime: startTime,
                  endTime: endTime,
                  allDay: true
              });
             
              });
          this.myCalendar.loadEvents();
          this.loading.dismiss();
      },
              error => { this.msg = <any>error; this.loading.dismiss(); })
      );
    }


  onViewTitleChanged(event) {
      this.monthtitle = event;
  }
  //onRangeChanged(event) {
     
  //}

  showLoading() {
      this.loading = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange: true
      });
      this.loading.present(); 
  }

  //loadEvents() {

  //    this.eventSource = this.createRandomEvents();
  //    console.log(this.eventSource);

  //}

  //onViewTitleChanged(title) {
  //    this.viewTitle = title;
  //}

  //onEventSelected(event) {
  //    console.log(event);
  //    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  //}

  //today() {
  //    this.calendar.currentDate = new Date();
  //}

  //onTimeSelected(ev) {
  //    //console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
  //    //    (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  //}

  //onCurrentDateChanged(event: Date) {
  //    var today = new Date();
  //    today.setHours(0, 0, 0, 0);
  //    event.setHours(0, 0, 0, 0);
  //    this.isToday = today.getTime() === event.getTime();
  //}


  //createRandomEvents() {
  //    var events = [];
  //    for (var i = 0; i < 50; i += 1) {
  //        var date = new Date();
  //        var eventType = Math.floor(Math.random() * 2);
  //        var startDay = Math.floor(Math.random() * 90) - 45;
  //        var endDay = Math.floor(Math.random() * 2) + startDay;
  //        var startTime;
  //        var endTime;
  //        if (eventType === 0) {
  //            startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));

  //            //startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  //            if (endDay === startDay) {
  //                endDay += 1;
  //            }
  //            //endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

  //            endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
  //            events.push({
  //                title: 'All Day - ' + i,
  //                startTime: startTime,
  //                endTime: endTime,
  //                allDay: true
  //            });

  //            console.log(startTime + "|||" + startDay + " ------------ " + endTime + "|||" + endDay)
  //        }
  //        //else {
  //        //    var startMinute = Math.floor(Math.random() * 24 * 60);
  //        //    var endMinute = Math.floor(Math.random() * 180) + startMinute;
  //        //    startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
  //        //    endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
  //        //    events.push({
  //        //        title: 'Event - ' + i,
  //        //        startTime: startTime,
  //        //        endTime: endTime,
  //        //        allDay: false
  //        //    });
  //        //}
  //    }
  //    return events;
  //}

  //onRangeChanged(ev) {
  //    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  //}

  //markDisabled = (date: Date) => {
  //    var current = new Date();
  //    current.setHours(0, 0, 0);
  //    return date < current;
  //};
}
