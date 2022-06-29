import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalServiceService } from 'src/app/global-service.service';
import { ReTweetetResponse } from '../home-time-line/model/reTweet';
import { TweeterServiceService } from '../tweeter-service/tweeter-service.service';
import { UsersResponse } from './model/UsersResponse';
import { UserTweet, UserTweetList } from './model/usertweet';

@Component({
  selector: 'app-user-time-line',
  templateUrl: './user-time-line.component.html',
  styleUrls: ['./user-time-line.component.css'],
})
export class UserTimeLineComponent implements OnInit {
  originalUsersResponse!: UsersResponse[];
  usersResponse!: UsersResponse[];
  tempUsersResponse!: UsersResponse[];

  mainUserUserId!: string | null;

  showUserTweetDetail: boolean = false;

  constructor(
    private tweeterServiceService: TweeterServiceService,
    private globalServiceService: GlobalServiceService,
    private modalService: NgbModal
  ) {
    globalServiceService.$goToUserList.subscribe({
      next: (data: any) => {
        console.log('Subscribeeeee');
        this.showUserTweetDetail = data;
        //this.getInitialUsersList();
      },
    });
  }

  ngOnInit(): void {
    this.mainUserUserId = localStorage.getItem('userId');

    console.log(this.mainUserUserId);
    this.getInitialUsersList();
  }

  getInitialUsersList() {
    this.tweeterServiceService.getAllUsers().subscribe({
      next: (data: any) => {
        this.usersResponse = data;
        this.usersResponse.sort((a, b) => {
          return a.userId - b.userId;
        });
        console.log('User Time Line Users ');
        console.log(this.usersResponse);
      },
      complete: () => {
        this.originalUsersResponse = this.usersResponse;
      },
    });
  }

  convertNumberToString(userId: number): string {
    let x = String(userId);
    return x;
  }

  userTweet!: UserTweet[];
  userTweetList: UserTweetList = new UserTweetList();
  userTweetmethod(user: UsersResponse) {
    // console.log('User Time Line User---->>>> ');
    // console.log(user);

    let tweetCount = 10;
    this.tweeterServiceService
      .getTweetOfUser(user.userId, tweetCount)
      .subscribe({
        next: (data: any) => {
          this.userTweet = data;
        },
        error: (e) => {},
        complete: () => {
          this.userTweetList.userId = user.userId;
          this.userTweetList.firstName = user.firstName;
          this.userTweetList.lastName = user.lastName;
          this.userTweetList.email = user.email;
          this.userTweetList.userTweet = this.userTweet;

          console.log('User Tweetsss---->>>> ');
          console.log(this.userTweetList);

          // show usersTweets flag
          this.showUserTweetDetail = true;
        },
      });
  }

  mainTweet(tweet: string) {
    this.retweetTweet(tweet);
    return tweet.split('<br>')[0];
  }

  retweetsList!: ReTweetetResponse[];
  retweetTweet(tweet: string) {
    let usersRetweets = tweet.split('<br>');
    let noOfUsersReTweetLength = usersRetweets.length;

    this.retweetsList = [];
    for (let i = 1; i < noOfUsersReTweetLength; i++) {
      let oneUserReTweet = usersRetweets[i];
      let oneUserReTweetSplit = oneUserReTweet.split('<reTwtInfo>'); // [userId, fullName, email, creationDate, text]

      let x = new ReTweetetResponse();
      x.retweetUserId = oneUserReTweetSplit[0];
      x.fullName = oneUserReTweetSplit[1];
      x.email = oneUserReTweetSplit[2];
      x.retweetedCreationTime = oneUserReTweetSplit[3];
      x.reTweetText = oneUserReTweetSplit[4];

      this.retweetsList.push(x);
    }

    //console.log(this.retweetsList);
  }

  onUsernameUseridSearchSubmit(form: NgForm) {
    this.usersResponse = this.originalUsersResponse;
    this.tempUsersResponse = [];

    // username Search
    if (Number.isNaN(parseInt(form.value.search, 10))) {
      this.usersResponse.forEach((d) => {
        if (
          form.value.search.toUpperCase().includes(d.firstName.toUpperCase()) ||
          form.value.search.toUpperCase().includes(d.lastName.toUpperCase()) ||
          form.value.search.toUpperCase().includes(d.email.toUpperCase())
        ) {
          console.log('username Search');
          this.tempUsersResponse.push(d);
        }
      });
    } else {
      // UserId Search
      console.log('UserId Search');

      this.usersResponse.forEach((d) => {
        if (parseInt(form.value.search, 10) === d.userId) {
          console.log(form.value.search);
          this.tempUsersResponse.push(d);
        }
      });
      console.log('UserId');
    }

    this.usersResponse = this.tempUsersResponse;
  }

  deletePost(userId: number, tweetId: number) {
    let del = confirm('Are You Sure!!!');
    if (del === true) {
      this.tweeterServiceService.deletePost(userId, tweetId).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: () => {
          // delete that card ORR
          console.log('Delete Called');
          this.userTweet.forEach((d, index) => {
            if (d.tweetId == tweetId) {
              this.userTweet.splice(index, 1);
            }
          });
        },
        complete: () => {
          // delete that card ORR
          console.log('Delete Called');
          this.userTweet.forEach((d, index) => {
            if (d.tweetId == tweetId) {
              this.userTweet.splice(index, 1);
            }
          });
        },
      });
    }
  }

  closeResult!: string;

  updateForm = new FormGroup({
    tweet: new FormControl(''),
    userId: new FormControl(''),
    tweetId: new FormControl(''),
    retweets: new FormControl(''),
    // lastName: new FormControl(''),
  });

  updatePost(userId: number, tweetId: number, tweetText: string, content: any) {
    let mainTweet_Editable = tweetText.split('<br>')[0];
    let retweets_Non_Editable = tweetText.replace(mainTweet_Editable, '');
    console.log('=====================================================');
    console.log(retweets_Non_Editable);

    this.updateForm.patchValue({
      tweet: mainTweet_Editable,
      userId: userId,
      tweetId: tweetId,
      retweets: retweets_Non_Editable,
    });
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      size: 'md',
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onTweeetUpdateSubmit() {
    console.log('this.updateForm.value.retweets++=============>>>>>>>>>');

    console.log(this.updateForm.value.retweets);

    this.tweeterServiceService
      .updateTweet(
        this.updateForm.value.userId,
        this.updateForm.value.tweetId,
        this.updateForm.value.tweet + this.updateForm.value.retweets
      )
      .subscribe({
        next: (data: any) => {
          console.log('Doneee this.updateForm.value');
        },
        error: () => {
          console.log('error this.updateForm.value');
        },
      });
  }
}
