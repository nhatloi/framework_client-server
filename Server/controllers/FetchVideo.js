const {google} = require('googleapis');
const YOUR_CLIENT_ID = '925372749044-d40sjceeb98lbvdiiicreaf5djih0m77.apps.googleusercontent.com'
const YOUR_CLIENT_SECRET = 'wWLp3cabds3kQDubpn9CPxXr'
const YOUR_REDIRECT_URL ='1//04rFaqoT8Hep7CgYIARAAGAQSNwF-L9Irc1D9QwvKWX7_drFq3N_FDUlNJZIi-_A1m2CR-AOXG9tgZWk6Y9mOo2b30OeEmIeCffs'

const oauth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
 'https://youtube.googleapis.com/youtube/v3/search'
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes
});