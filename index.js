const { Telegraf, Input } = require('telegraf');
const { message } = require('telegraf/filters');
const fs = require('fs');
const ytdl = require('ytdl-core');

const bot = new Telegraf("******") // replace your botfather api with ******

bot.start((ctx) => ctx.reply('لینک آهنگ خود را در یوتیوب برای من بفرست تا برات آهنگشو تو تلگرام بفرستم\nسازنده :\n@sobhan3000'))

bot.on(message('text'), (ctx)=>{

    if (ctx.message.text == "راهنما") {
        ctx.reply("لینک آهنگ یا ویدئو یوتیوب را بفرست\nسازنده :\n@sobhan3000");
    }

    else {
                var url = ctx.message.text; // get url from message
                if (url != undefined || url != '') {
                    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                    var match = url.match(regExp);
                    if (match && match[2].length == 11) {   // check url validation
                        async function f1() {
                            let aw = await ytdl.getBasicInfo(url)
                            ctx.reply("درحال آپلود " + aw.videoDetails.title + "در تلگرام");  //send information message
                            ctx.replyWithAudio(Input.fromReadableStream(ytdl(url, { filter: 'audioonly', quality: 'highestaudio' })), {title: aw.videoDetails.title, performer: aw.videoDetails.author.name, duration: aw.videoDetails.lengthSeconds}) // get and send the music
                          }
                          f1();
                    }
                    else {
                        ctx.reply("لینک فرستاده شده اشتباه است");
                    }
                }
    }
})

bot.launch()