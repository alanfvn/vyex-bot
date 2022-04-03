const { TwitterApi } = require('twitter-api-v2');
const {gen_sentence} = require('../common/words_util')
const {get_images} = require('../common/util')

const client = new TwitterApi({
    appKey: process.env.KEY,
    appSecret: process.env.SECRET,
    accessToken: process.env.TOKEN,
    accessSecret: process.env.TOKEN_SECRET,
})

function start_tweet_schedule(){
    send_tweet();
    setInterval(() => send_tweet(), 1000*60*60); 
}

async function send_tweet(){
    const data = await gen_sentence(); 
    const imgs = await get_images(data.urls);
    let mids = [];

    for(let img of imgs){
        let id = await client.v1.uploadMedia(img, {type: 'png'});
        mids.push(id);
    }

    const tweet = await client.v1.tweet(data.text, {media_ids: mids});
    console.log('Tweeted:', tweet.id)
}


module.exports = {
    start_tweet_schedule,
}