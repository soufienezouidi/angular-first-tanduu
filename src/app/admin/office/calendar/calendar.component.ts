import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
   ngAfterViewInit() {
    this.loadBootstrap("assets/css/bootstrap.min.css")
    this.loadStyleScript("assets/plugins/fullcalendar/fullcalendar.min.css")
    this.loadBasicStyleScript("assets/css/style.css")
    this.loadJquery("assets/js/jquery.min.js")
    this.loadPopperjs("assets/js/popper.min.js")
    this.loadBootstarpjs("assets/js/bootstrap.min.js")
    this.loadDynmicallyScript("assets/plugins/jquery-ui/jquery-ui.min.js");
    this.loadFirstScript("assets/plugins/fullcalendar/fullcalendar.min.js")
    this.loadSecondScript("assets/plugins/fullcalendar/jquery.fullcalendar.js")
  }
  loadDynmicallyScript(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  loadFirstScript(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  loadSecondScript(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  loadStyleScript(js) {
    var script = document.createElement('link');
    script.href = js;
    script.rel = "stylesheet"
    // script.async = false;
    document.head.appendChild(script);
  }
  loadBasicStyleScript(js) {
    var script = document.createElement('link');
    script.href = js;
    script.rel = "stylesheet"
    // script.async = false;
    document.head.appendChild(script);
  }
  loadJquery(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  loadBootstrap(js) {
    var script = document.createElement('link');
    script.href = js;
    script.rel = "stylesheet"
    // script.async = false;
    document.head.appendChild(script);
  }
  loadBootstarpjs(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  loadPopperjs(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
}
