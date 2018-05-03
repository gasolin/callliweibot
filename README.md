A g0v.tw project for query legislator's contact information via instant messaging bot (Currently LINE is supported)

## Demo

![Imgur](https://i.imgur.com/G1HzZyal.jpg)

Add LINE bot via https://line.me/R/ti/p/%40ybi3779e

Or scan in LINE with QRCode

![qrcode](http://qr-official.line.me/L/XoHbSCIBkd.png)

Web version is also available in http://call.ly.g0v.tw ([github](https://github.com/zhengda/callliwei))

## Setup (LINE)

Create a bot in LINE, setup `accessToken` and `channelSecret` in `bottender.config.js`.

Run `npm start` in `convdata` to convert origin data to the proper dataset for the bot.

Then run `npm run dev` in `line` to run the bot in test environment.

You can host this bot on https supported server or test it with ngrok.

## Project information and contributors

Data from https://github.com/zhengda/callliwei

See http://beta.hackfoldr.org/callliwei
