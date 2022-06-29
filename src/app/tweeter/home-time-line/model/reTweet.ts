export class ReTweetet {
  tweetId!: number;
  reTweetText!: string;
  retweetUserId?: string | null;
  email?: string | null;
  fullName!: string | null;
  retweetedCreationTime: Date | undefined;
}

export class ReTweetetResponse {
  retweetUserId!: string;
  fullName!: string;
  email!: string;
  retweetedCreationTime!: string;
  reTweetText!: string;
}
