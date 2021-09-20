import { startBot,isSlashCommand, } from "https://deno.land/x/discordeno@12.0.1/mod.ts";
import { registerCollection, commandProcesses } from "./src/command/mod.ts"
import { configs } from "./configs.ts"


/**
 * botを起動
 */
startBot({
  token: configs.token,
  intents: ["Guilds", "GuildMessages", "GuildVoiceStates"],
  eventHandlers: {
    ready() {
      //スラッシュコマンドをすべて登録
      //今はテストのためにguildIDを登録している
      registerCollection(configs.guildId)
      console.log("Successfully connected to gateway");
      
    },
    //メッセージが送信されたときに呼び出し
    messageCreate(message) {
      if (message.content === "&ping") {
        message.reply("Pong using Discordeno!");
      }
    },
    /*slashコマンド実行時に呼ばれる
    (それ以外にもタイミングあるらしいけどとりあえず放置)*/
    interactionCreate(data,member) {
      //ここでslashコマンドかどうかを確認
      if(isSlashCommand(data)){
        if(member)
          //実行するコマンドの選択を委譲
          return commandProcesses(data,member)
      }
      
    }
    
  },
});
