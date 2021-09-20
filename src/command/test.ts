import { SlashCommandInteraction, sendInteractionResponse, DiscordInteractionResponseTypes, snowflakeToBigint,DiscordenoMember, createSlashCommand} from "https://deno.land/x/discordeno@12.0.1/mod.ts";

/**
 * slashコマンドを登録
 * @param guildId 
 */
export function registerTest(guildId:bigint){
    createSlashCommand({
        name:"test",
        description:"send 'test' command",
    },guildId ? guildId : undefined)
}

/**
 * コマンドの処理内容を記述
 * @param interaction 
 * @param member 
 * @returns 
 */
export async function test(interaction:SlashCommandInteraction,member:DiscordenoMember){
    const id = interaction.id;
    if(id){
        return await sendInteractionResponse(snowflakeToBigint(id), interaction.token, {
            private:false,
            type:DiscordInteractionResponseTypes.ChannelMessageWithSource,
            data:{
                content: "test"
            }
        })
        .catch(e => {
            console.log(e)
        })
    }
    if(!member) console.log("non member")
}