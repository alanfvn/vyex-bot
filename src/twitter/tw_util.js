const { TwitterApi } = require('twitter-api-v2');
const {genSentence} = require('../util/words_util')
const {getImages} = require('../util/util')

const client = new TwitterApi({
    appKey: process.env.key,
    appSecret: process.env.secret,
    accessToken: process.env.token,
    accessSecret: process.env.token_secret,
});

function startTweetSchedule(){
    sendTweet();
    setInterval(() => sendTweet(), 1000*60*60); 
}

async function sendTweet(){
    const data = genSentence(); 
    const text = data.text;
    let urls = data.urls;
    let mids = []

    let images = await getImages(urls);

    for(let img of images){
        let id = await client.v1.uploadMedia(img, {type: 'png'});
        mids.push(id);
    }

    const tweet = await client.v1.tweet(text, {media_ids: mids});
    console.log('tweeted:', tweet.id)
}


module.exports = {
    startTweetSchedule,
    sendTweet,
}