const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const Config = require('../config');

const Language = require('../language');
const Lang = Language.getString('off');

var OFF = {
    isOff: false,
    reason: false,
    lastseen: 0
};

// https://stackoverflow.com/a/37096512
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " " + Lang.HOUR + ", " : " " + Lang.HOUR + ", ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " " + Lang.MINUTE + ", " : " " + Lang.MINUTE + ", ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " " + Lang.SECOND : " " + Lang.SECOND) : "";
    return hDisplay + mDisplay + sDisplay; 
}

Asena.addCommand({on: 'text', fromMe: false, deleteCommand: false}, (async (message, match) => {
    if (Config.OFFMSG == 'default') {

        if (OFF.isOff && ((!message.jid.includes('-')) || (message.jid.includes('-') && 
            (( message.mention !== false && message.mention.length !== 0 ) || message.reply_message !== false)))) {
            if (message.jid.includes('-') && (message.mention !== false && message.mention.length !== 0)) {
                message.mention.map(async (jid) => {
                    if (message.client.user.jid.split('@')[0] === jid.split('@')[0]) {
                        await message.client.sendMessage(message.jid,Lang.OFF_TEXT + '\n' + 
                        (OFF.reason !== false ? '\n*' + Lang.REASON + ':* ```' + OFF.reason + '```' : '') + 
                        (OFF.lastseen !== 0 ? '\n*' + Lang.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - OFF.lastseen) + Lang.AGO : ''), MessageType.text, {quoted: message.data});            
                    }
                })
            } else if (message.jid.includes('-') && message.reply_message !== false) {
                if (message.reply_message.jid.split('@')[0] === message.client.user.jid.split('@')[0]) {
                    await message.client.sendMessage(message.jid,Lang.OFF_TEXT + '\n' + 
                        (OFF.reason !== false ? '\n*' + Lang.REASON + ':* ```' + OFF.reason + '```' : '') + 
                        (OFF.lastseen !== 0 ? '\n*' + Lang.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - OFF.lastseen) + Lang.AGO : ''), MessageType.text, {quoted: message.data});
                }
            } else {
                await message.client.sendMessage(message.jid,Lang.OFF_TEXT + '\n' + 
                (OFF.reason !== false ? '\n*' + Lang.REASON + ':* ```' + OFF.reason + '```' : '') + 
                (OFF.lastseen !== 0 ? '\n*' + Lang.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - OFF.lastseen) + Lang.AGO : ''), MessageType.text, {quoted: message.data});
            }
        }
    }
    else {
        if (OFF.isOff && ((!message.jid.includes('-')) || (message.jid.includes('-') && 
            (( message.mention !== false && message.mention.length !== 0 ) || message.reply_message !== false)))) {
            if (message.jid.includes('-') && (message.mention !== false && message.mention.length !== 0)) {
                message.mention.map(async (jid) => {
                    if (message.client.user.jid.split('@')[0] === jid.split('@')[0]) {
                        await message.client.sendMessage(message.jid,Config.OFFMSG + '\n' + 
                        (OFF.reason !== false ? '\n*' + Lang.REASON + ':* ```' + OFF.reason + '```' : '') + 
                        (OFF.lastseen !== 0 ? '\n*' + Lang.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - OFF.lastseen) + Lang.AGO : ''), MessageType.text, {quoted: message.data});            
                    }
                })
            } else if (message.jid.includes('-') && message.reply_message !== false) {
                if (message.reply_message.jid.split('@')[0] === message.client.user.jid.split('@')[0]) {
                    await message.client.sendMessage(message.jid,Config.OFFMSG + '\n' + 
                        (OFF.reason !== false ? '\n*' + Lang.REASON + ':* ```' + OFF.reason + '```' : '') + 
                        (OFF.lastseen !== 0 ? '\n*' + Lang.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - OFF.lastseen) + Lang.AGO : ''), MessageType.text, {quoted: message.data});
                }
            } else {
                await message.client.sendMessage(message.jid,Config.AFKMSG + '\n' + 
                (OFF.reason !== false ? '\n*' + Lang.REASON + ':* ```' + OFF.reason + '```' : '') + 
                (OFF.lastseen !== 0 ? '\n*' + Lang.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - OFF.lastseen) + Lang.AGO : ''), MessageType.text, {quoted: message.data});
            }
        }
    }
}));

Asena.addCommand({on: 'text', fromMe: true, deleteCommand: false}, (async (message, match) => {
    if (OFF.isOff && !message.id.startsWith('3EB0')) {
        OFF.lastseen = 0;
        OFF.reason = false;
        OFF.isOff = false;

        await message.client.sendMessage(message.jid,Lang.IM_NOT_OFF,MessageType.text);
    }
}));

Asena.addCommand({pattern: 'off ?(.*)', fromMe: true, deleteCommand: false, desc: Lang.AFK_DESC}, (async (message, match) => {     
    if (!OFF.isOff) {
        OFF.lastseen = Math.round((new Date()).getTime() / 1000);
        if (match[1] !== '') { OFF.reason = match[1]; }
        OFF.isOff = true;

        await message.client.sendMessage(message.jid,Lang.IM_OFF + (OFF.reason !== false ? ('\n*' + Lang.REASON +':* ```' + OFF.reason + '```') : ''),MessageType.text);
    }
}));

module.exports = { secondsToHms };
