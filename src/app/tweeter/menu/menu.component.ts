import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServiceService } from 'src/app/global-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  // listOfColors: string[] = [
  //   'red',
  //   'green',
  //   'blue',
  //   'voilet',
  //   'black',
  //   'yellow',
  //   'cyan',
  // ];
  // currentColor: string = 'blue';

  constructor(
    private router: Router,
    private globalServiceService: GlobalServiceService
  ) {}

  menuLinkActive: string = 'sidebar-menu__item--active';
  userLinkActive: string = '';
  profileLinkActive: string = '';

  ngOnInit(): void {
    // this.turnOffSplash();
  }

  menuSelection(menu: string) {
    console.log(menu);

    if (menu === 'home') {
      this.menuLinkActive = 'sidebar-menu__item--active';
      this.userLinkActive = '';
      this.profileLinkActive = '';
    } else if (menu === 'user') {
      // to switch from UserDetail to UsersList
      this.globalServiceService.$goToUserList.next(false);
      this.menuLinkActive = '';
      this.userLinkActive = 'sidebar-menu__item--active';
      this.profileLinkActive = '';
    } else {
      this.menuLinkActive = '';
      this.userLinkActive = '';
      this.profileLinkActive = 'sidebar-menu__item--active';
    }
    this.router.navigate([`tweeter/${menu}`]);
  }

  logout() {
    console.log('user Logged out');
    localStorage.clear();
    this.router.navigate([`login`]);
  }

  // i = 0;
  // turnOffSplash() {
  //   setTimeout(() => {
  //     this.currentColor = this.listOfColors[this.i];
  //     this.i = (this.i + 1) % 5;

  //     this.turnOffSplash();
  //   }, 400);
  // }
}
