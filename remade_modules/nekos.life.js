const endpoints = {
  nsfw: {
    "randomHentaiGif": "/img/Random_hentai_gif",
    "pussy": "/img/pussy",
    "nekoGif": "/img/nsfw_neko_gif",
    "neko": "/img/lewd",
    "lesbian": "/img/les",
    "kuni": "/img/kuni",
    "cumsluts": "/img/cum",
    "classic": "/img/classic",
    "boobs": "/img/boobs",
    "bJ": "/img/bj",
    "anal": "/img/anal",
    "avatar": "/img/nsfw_avatar",
    "yuri": "/img/yuri",
    "trap": "/img/trap",
    "tits": "/img/tits",
    "girlSoloGif": "/img/solog",
    "girlSolo": "/img/solo",
    "pussyWankGif": "/img/pwankg",
    "pussyArt": "/img/pussy_jpg",
    "kemonomimi": "/img/lewdkemo",
    "kitsune": "/img/lewdk",
    "keta": "/img/keta",
    "holo": "/img/hololewd",
    "holoEro": "/img/holoero",
    "hentai": "/img/hentai",
    "futanari": "/img/futanari",
    "femdom": "/img/femdom",
    "feetGif": "/img/feetg",
    "eroFeet": "/img/erofeet",
    "feet": "/img/feet",
    "ero": "/img/ero",
    "eroKitsune": "/img/erok",
    "eroKemonomimi": "/img/erokemo",
    "eroNeko": "/img/eron",
    "eroYuri": "/img/eroyuri",
    "cumArts": "/img/cum_jpg",
    "blowJob": "/img/blowjob",
    "spank": "/img/spank",
    "gasm": "/img/gasm"
  },
  sfw: {
    "tickle": "/img/tickle",
    "slap": "/img/slap",
    "poke": "/img/poke",
    "pat": "/img/pat",
    "neko": "/img/neko",
    "meow": "/img/meow",
    "lizard": "/img/lizard",
    "kiss": "/img/kiss",
    "hug": "/img/hug",
    "foxGirl": "/img/fox_girl",
    "feed": "/img/feed",
    "cuddle": "/img/cuddle",
    "why": "/why",
    "catText": "/cat",
    "OwOify": "/owoify",
    "8Ball": "/8ball",
    "fact": "/fact",
    "nekoGif": "/img/ngif",
    "kemonomimi": "/img/kemonomimi",
    "holo": "/img/holo",
    "smug": "/img/smug",
    "baka": "/img/baka",
    "woof": "/img/woof",
    "spoiler": "/spoiler",
    "wallpaper": "/img/wallpaper",
    "goose": "/img/goose",
    "gecg": "/img/gecg",
    "avatar": "/img/avatar",
    "waifu": "/img/waifu"
  }
}

function getContent(url) {
  return new Promise((resolve, reject) => {
    fetch(url).then((res) => {
      const {status: statusCode} = res;
      if (statusCode !== 200) {
        reject(`Request failed. Status code: ${statusCode}`);
      }
      
      res.json().then(rawData => {
        try {
          const parsedData = rawData;
          resolve(parsedData);
        } catch(e) {
          reject(`Error: ${e}`);
        }
      })
    })
  });
}

class NekoClient {
  constructor() {
    let self = this;
    self.sfw = {};
    self.nsfw = {};
    let baseURL = 'https://nekos.life/api/v2';
    Object.keys(endpoints.sfw).forEach(async (endpoint) => {
      self.sfw[endpoint] = async function (queryParams = '') {
        let url = new URL(`${baseURL}${endpoints.sfw[endpoint]}`);
        queryParams !== '' ? url.search = new URLSearchParams(queryParams) : '';
        return await getContent(url.toString());
        };
    });
    Object.keys(endpoints.nsfw).forEach( async (endpoint) => {
      self.nsfw[endpoint] = async function (queryParams = '') {
        let url = new URL(`${baseURL}${endpoints.nsfw[endpoint]}`);
        queryParams !== '' ? url.search = new URLSearchParams(queryParams) : '';
        return await getContent(url.toString());
      };
    });
  }
}

module.exports = NekoClient;
