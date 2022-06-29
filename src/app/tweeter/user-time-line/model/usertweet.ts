export interface UserTweet {
  tweetId: number;
  text: string;
  createdAt: Date;
}

export class UserTweetList {
  userId!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  userTweet!: UserTweet[];
}
