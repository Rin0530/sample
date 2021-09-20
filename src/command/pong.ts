import { SlashCommandInteraction, cache, sendInteractionResponse, DiscordInteractionResponseTypes, snowflakeToBigint,DiscordenoMember, createSlashCommand} from "https://deno.land/x/discordeno@12.0.1/mod.ts";

/**
 * slashコマンドを登録
 * @param guildId 
 */
export function registerPong(guildId:bigint){
    createSlashCommand({
        name:"pong",
        description:"reply 'pong!' command",
    },guildId ? guildId : undefined)
}

/**
 * コマンドの処理内容を記述
 * @param interaction 
 * @param member 
 * @returns 
 */
export async function pong(interaction:SlashCommandInteraction,member:DiscordenoMember){
    const guild = interaction.guildId
    const id = interaction.id;
    if(guild && id){
        return await sendInteractionResponse(snowflakeToBigint(id), interaction.token, {
            private:false,
            type:DiscordInteractionResponseTypes.ChannelMessageWithSource,
            data:{
                embeds: [
                    {
                        author: {
                            name: `${member.name(snowflakeToBigint(guild))}`,
                            iconUrl: `${member.avatarURL}`
                        },
                        description: "pong",
                        fields: [
                            {
                                name: "embedsName",
                                value:"embedValue"
                            }
                        ]
                    }
                ]
            }
        })
        .catch(e => {
            console.log(e)
        })
    }
    if(!member) console.log("non member")
}