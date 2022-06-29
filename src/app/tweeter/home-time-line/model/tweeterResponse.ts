export interface TweeterResponse {
  id: string;
  tweetId: number;
  userId: number;
  username: string;
  fullName: string;
  text: string;
  createdAt: Date;
  likes: number;
}
