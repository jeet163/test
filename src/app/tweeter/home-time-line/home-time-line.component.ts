import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TweeterServiceService } from '../tweeter-service/tweeter-service.service';
import { ReTweetet, ReTweetetResponse } from './model/reTweet';
import { TweeterResponse } from './model/tweeterResponse';

@Component({
  selector: 'app-home-time-line',
  templateUrl: './home-time-line.component.html',
  styleUrls: ['./home-time-line.component.css'],
})
export class HomeTimeLineComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private tweeterServiceService: TweeterServiceService
  ) {}

  tweeterResponse: TweeterResponse[] = [];

  ngOnInit(): void {
    let userId: any = localStorage.getItem('userId');
    this.getInitialTweets(userId);
  }

  getInitialTweets(userId: string | null) {
    this.tweeterResponse = [];
    this.tweeterServiceService
      .getAllTweetsExceptUser_HomeTimeLine(userId)
      .subscribe({
        next: (data: any) => {
          console.log('data_data_data_data');
          console.log(data);
          this.tweeterResponse = data;
          console.log(JSON.stringify(this.tweeterResponse, null, 2));
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

  // Retweet
  closeResult!: string;
  selected_Tweet!: TweeterResponse;
  retweetMethod(tweet: TweeterResponse, content: any) {
    this.selected_Tweet = tweet;
    //console.log(tweet);

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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

  onReTweeetSubmit(data: NgForm) {
    let reTweet = new ReTweetet();
    reTweet.tweetId = this.selected_Tweet.tweetId;
    reTweet.reTweetText = data.value.tweet;

    reTweet.retweetUserId = localStorage.getItem('userId');
    reTweet.fullName = localStorage.getItem('userFullName');
    reTweet.email = localStorage.getItem('email');
    reTweet.retweetedCreationTime = undefined;

    this.tweeterServiceService.retweet(reTweet).subscribe({
      next: (data: any) => {
        console.log('Retweeted Succesfully');
        let userId: any = localStorage.getItem('userId');
        this.getInitialTweets(userId);
      },
      error: () => {
        let userId: any = localStorage.getItem('userId');
        this.getInitialTweets(userId);
      },
      complete: () => {
        let userId: any = localStorage.getItem('userId');
        this.getInitialTweets(userId);
      },
    });

    console.log(reTweet);
  }

  likeTweetMethod(tweet: TweeterResponse) {
    let tweetId = tweet.tweetId;
    let userId = localStorage.getItem('userId');

    this.tweeterServiceService.updateTweetLikes(tweetId, userId).subscribe({
      next: (data: any) => {
        console.log(tweetId + ' Hello ' + userId);
        console.log(data);
      },
      complete: () => {
        this.getInitialTweets(userId);
      },
    });
  }
}
