import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication-service/authentication.service';
import { apiEndPoint } from 'src/app/environments';
import { ReTweetet } from '../home-time-line/model/reTweet';
import { Tweet } from '../post-tweet/model/tweet';
import { UpdatedTweet } from '../user-time-line/model/updatedTweet';

@Injectable({
  providedIn: 'root',
})
export class TweeterServiceService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  getHeaders(): HttpHeaders {
    this.isTokenExpired();

    let currentToken = localStorage.getItem('token');

    if (currentToken != null) {
      let header = new HttpHeaders({
        'Content-Type': 'application/json',
        authorizationToken: currentToken,
      });

      return header;
    }

    return new HttpHeaders();
  }

  getAllTweetsExceptUser_HomeTimeLine(userId: string | null) {
    let endpoint = apiEndPoint.HOME_TIMELINE_ALL_TWEETS + '/' + userId;
    return this.http.get(endpoint, {
      observe: 'body',
      headers: this.getHeaders(),
    });
  }

  postTweet(tweet: Tweet) {
    let endpoint = apiEndPoint.POST_TWEET_PATH;
    return this.http.post(endpoint, tweet, {
      observe: 'response',
      headers: this.getHeaders(),
    });
  }

  getAllUsers() {
    let endpoint = apiEndPoint.USER_TIMELINE_ALL_USERS;
    return this.http.get(endpoint, {
      observe: 'body',
      headers: this.getHeaders(),
    });
  }

  getTweetOfUser(userId: number, tweetCount: number) {
    let endpoint =
      apiEndPoint.USER_TIMELINE_ALL_TWEET_USER +
      userId +
      '/tweetcount/' +
      tweetCount;
    return this.http.get(endpoint, {
      observe: 'body',
      headers: this.getHeaders(),
    });
  }

  deletePost(userId: number, tweetId: number) {
    let endpoint = apiEndPoint.DELETE_TWEET_PATH + '/' + userId + '/' + tweetId;

    return this.http.delete(endpoint, {
      headers: this.getHeaders(),
      observe: 'body',
    });
  }

  retweet(reTweet: ReTweetet) {
    let endpoint = apiEndPoint.RETWEET_PATH;
    return this.http.put(endpoint, reTweet, {
      headers: this.getHeaders(),
      observe: 'body',
    });
  }

  updateTweet(userId: number, tweetId: number, tweet: string) {
    let updateTweet = new UpdatedTweet();
    updateTweet.userId = userId;
    updateTweet.tweetId = tweetId;
    updateTweet.text = tweet;

    let endpoint = apiEndPoint.TWEET_UPDATE_PATH + '/' + userId;
    return this.http.put(endpoint, updateTweet, {
      headers: this.getHeaders(),
      observe: 'body',
    });
  }

  updateTweetLikes(tweetId: number, userId?: string | null) {
    let endpoint =
      apiEndPoint.TWEET_LIKES_PATH +
      '?tweetId=' +
      tweetId +
      '&userId=' +
      userId;
    return this.http.put(endpoint, Object, {
      headers: this.getHeaders(),
      observe: 'body',
    });
  }

  isTokenExpired() {
    let currentToken = localStorage.getItem('token');
    if (currentToken != null) {
      this.authenticationService
        .userValidateUsingToken(currentToken)
        .subscribe({
          next: (data: any) => {},
          error: () => {
            console.log('error');
            console.log('user Logged out');
            localStorage.clear();
            this.router.navigate([`login`]);
          },
        });
    }
  }
}
