// Twitter OAuth
// Create a Twitter app and fill in the values below
// Rename as twitter.js

const Twitter = {
    CONSUMER_KEY: '',
    CONSUMER_SECRET: '',
    OWNER_ID: '',
    CALLBACK_URL: '',
    REQ_TOKEN_URL: 'https://api.twitter.com/oauth/request_token',
    AUTHORIZE_URL: 'https://api.twitter.com/oauth/authorize',
    ACCESS_TOKEN_URL: 'https://api.twitter.com/oauth/access_token'
}

module.exports = Twitter