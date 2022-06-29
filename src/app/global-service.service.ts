import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class GlobalServiceService {
  $loginSuccessful = new Subject<Boolean>();
  loginSuccessfulChangedObservable = this.$loginSuccessful.asObservable();
  
  $goToUserList = new Subject<Boolean>();
  goToUserListChangedObservable = this.$goToUserList.asObservable();

  constructor() {}

  loginStatus(isloginDone: boolean) {
    // emit this value
    this.$loginSuccessful.next(true);
  }
}
