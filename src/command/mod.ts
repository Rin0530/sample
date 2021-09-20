import { SlashCommandInteraction, DiscordenoMember} from "https://deno.land/x/discordeno@12.0.1/mod.ts";
import * as pong from "./pong.ts"
import * as test from "./test.ts"

/**
 * コマンドをすべて登録する
 * 実際の登録は委譲
 */
export function registerCollection(guildId:bigint){
    pong.registerPong(guildId);
    test.registerTest(guildId);
}

/**
 * 実行するコマンドを選択する
 * 処理内容は委譲
 * @param data 
 * @param member 
 * @returns 
 */
export function commandProcesses(data:SlashCommandInteraction, member: DiscordenoMember){
    //data.data?.name コマンドの名前
    switch(data.data?.name){
        case "pong": return pong.pong(data, member);
        case "test": return test.test(data, member);
        default : console.log(data.data?.name)
    }
}