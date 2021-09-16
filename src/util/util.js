const axios = require('axios')


function randomNum(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}

function randomItem(list){
    return list[Math.floor(Math.random()*list.length)];
}

async function getImages(urls){

    const urlSet = new Set(urls); //we don't want duplicates
    const images = [];

    for(let url of urlSet){
        const response = await axios.get(url, {responseType: 'arraybuffer'});
        images.push(Buffer.from(response.data))
    }
    return images;
}




module.exports = {
    randomNum,
    randomItem,
    getImages,
}