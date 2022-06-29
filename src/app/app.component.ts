import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GlobalServiceService } from './global-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tweeter-application';

  loginSuccessful: Boolean = false;

  constructor(private globalServiceService: GlobalServiceService) {
    // this.globalServiceService.$loginSuccessful.subscribe({
    //   next: (data: Boolean) => {
    //     this.loginSuccessful = data;
    //     console.log(data);
    //   },
    // });
  }

  ngOnInit(): void {}
}
