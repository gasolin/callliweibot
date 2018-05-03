const { LineBot } = require('bottender');
const { Line } = require('messaging-api-line');
const { createServer } = require('bottender/express');
const Fuse = require('fuse.js');

const config = require('./bottender.config.js').line;
const LIWEI = require('./lib/liwei.json');
const ORDERED_CONTENT = ['committee', 'party', 'email', 'facebook', 'lineid'];
const NAME_MAP = {
  'name': {
    name: '姓名',
    icon: '',
  },
  'ename': {
    name: '英文',
    icon: '',
  },
  'party': {
    name: '黨派',
    icon: '',
  },
  'committee': {
    name: '所屬委員會',
    icon: '',
  },
  'email': {
    name: 'Email',
    icon: '✉️',
  },
  'alltel': {
    name: '電話',
    icon: '📞',
  },
  'facebook': {
    name: 'Facebook',
    icon: '',
  },
  'lineid': {
    name: 'LINE',
    icon: '',
  },
};

const options = {
  shouldSort: true,
  keys: ['name'],
  threshold: 0.3,
  distance: 100,
  minMatchCharLength: 2,
};
let fuse = new Fuse(LIWEI, options);

const bot = new LineBot({
  accessToken: config.accessToken,
  channelSecret: config.channelSecret,
});

bot.onEvent(async context => {
  let event = context.event;
  if (event.isText) {
    context.typing(500);
    let results = fuse.search(event.text);
    if (results.length > 0) {
      replys = [];
      results.forEach(item => {
        let makeStr = `${item.name}`;
        ORDERED_CONTENT.forEach(key => {
          if (item[key]) {
            makeStr += `\n${NAME_MAP[key].name}：${item[key]}`;
          }
        });
        makeStr += `\n更多資訊：http://call.ly.g0v.tw/profile/${item.name}`;
        replys.push(makeStr);
      });

      // LINE reply API allow 5 messages
      let offset = replys.length > 5 ? 5 : replys.length;
      let msgs = replys.splice(0, offset).map(str => Line.createText(str));
      await context.reply(msgs);
    } else {
      await context.reply([
        Line.createText(`很抱歉，我沒有'${event.text}'相關資訊`)
      ]);
    }
  }
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
