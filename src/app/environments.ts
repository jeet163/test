export const environment = {
  URL_PREFIX_AUTHENTICATION: 'http://localhost:8100',
  URL_PREFIX_TWEET: 'http://localhost:8200',
  URL_PREFIX_HOME_TIME_LINE: 'http://localhost:8300',
  URL_PREFIX_USER_TIME_LINE: 'http://localhost:8400',

  HEALTH_URL: '/health',
  LOGIN_URL: '/login',
  VALIDATE_TOKEN_PROFILE_URL: '/validate',
  SIGNUP_URL: '/signUp',
  FORGET_PASSWORD: '/forget',
  VALIDATE_TOKEN_EMAIL_VERIFICATION: '/emailVerification/token=',
  RESET_PASSWORD: '/resetPassword',

  POST_TWEET_URL: '/api/v1.0/tweets/add',
  ALL_TWEETS_URL: '/api/v1.0/tweets/all',
  ALL_USERS_URL: '/api/v1.0/tweets/allusers',
  USERS_SPECIFIC_TWEET_URL: '/api/v1.0/tweets/userid/',
  DELETE_TWEET_URL: '/api/v1.0/tweets/delete',
  RETWEET_URL: '/api/v1.0/retweets',
  TWEET_UPDATE_URL: '/api/v1.0/tweets/update',
  TWEET_LIKES_URL: '/api/v1.0/like',
};
export const apiEndPoint = {
  HEALTH_PATH: environment.URL_PREFIX_AUTHENTICATION + environment.HEALTH_URL,
  LOGIN_PATH: environment.URL_PREFIX_AUTHENTICATION + environment.LOGIN_URL,
  VALIDATE_TOKEN_PROFILE_PATH:
    environment.URL_PREFIX_AUTHENTICATION + environment.VALIDATE_TOKEN_PROFILE_URL,
  SIGN_UP_PATH: environment.URL_PREFIX_AUTHENTICATION + environment.SIGNUP_URL,
  FORGET_PASSWORD_PATH:
    environment.URL_PREFIX_AUTHENTICATION + environment.FORGET_PASSWORD,
  RESET_PASSWORD_PATH:
    environment.URL_PREFIX_AUTHENTICATION + environment.RESET_PASSWORD,

  VALIDATE_TOKEN_PATH:
    environment.URL_PREFIX_AUTHENTICATION + environment.VALIDATE_TOKEN_EMAIL_VERIFICATION,

  POST_TWEET_PATH: environment.URL_PREFIX_TWEET + environment.POST_TWEET_URL,

  HOME_TIMELINE_ALL_TWEETS:
    environment.URL_PREFIX_HOME_TIME_LINE + environment.ALL_TWEETS_URL,

  USER_TIMELINE_ALL_USERS:
    environment.URL_PREFIX_USER_TIME_LINE + environment.ALL_USERS_URL,

  USER_TIMELINE_ALL_TWEET_USER:
    environment.URL_PREFIX_USER_TIME_LINE +
    environment.USERS_SPECIFIC_TWEET_URL,

  DELETE_TWEET_PATH:
    environment.URL_PREFIX_TWEET + environment.DELETE_TWEET_URL,

  RETWEET_PATH: environment.URL_PREFIX_TWEET + environment.RETWEET_URL,

  TWEET_UPDATE_PATH:
    environment.URL_PREFIX_TWEET + environment.TWEET_UPDATE_URL,

  TWEET_LIKES_PATH: environment.URL_PREFIX_TWEET + environment.TWEET_LIKES_URL,
};
