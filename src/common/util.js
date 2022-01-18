const axios = require('axios')

function random_num(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}

async function get_images(urls){
    const urlSet = new Set(urls); //we don't want duplicates
    const images = [];
    
    for(let url of urlSet){
        const response = await axios.get(url, {responseType: 'arraybuffer'});
        images.push(Buffer.from(response.data))
    }
    return images;
}

module.exports = {
    random_num,
    get_images,
}