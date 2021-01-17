const {google} = require('googleapis')
const {OAuth2} = google.auth
const OAUTH_PlAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    YOUTUBE_SERVICE_CLIENT_ID,
    YOUTUBE_SERVICE_CLIENT_SECRET,
    YOUTUBE_SERVICE_REFRESH_TOKEN,
} = process.env

const oauth2Client = new OAuth2(
    YOUTUBE_SERVICE_CLIENT_ID,
    YOUTUBE_SERVICE_CLIENT_SECRET,
    YOUTUBE_SERVICE_REFRESH_TOKEN,
    OAUTH_PlAYGROUND
)
const refresh_token = async () =>{
    oauth2Client.setCredentials({
        refresh_token: YOUTUBE_SERVICE_REFRESH_TOKEN
    })
    const accessToken = await oauth2Client.getAccessToken()
    return accessToken
}
module.exports = refresh_token