const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');
const Discord = require("discord.js")
const GameCord = require("discord-gamecord");
const ms = require("ms");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pokemon')
        .setDescription('Chat with GPT-3')
    .addStringOption(option => option.setName('time').setDescription('énérer un image via une intelligence artificielle."').setRequired(true)),
    async execute(interaction, message, guild, client, bot, args) {
     const time = interaction.options.getString("time");

        const Game = new GameCord.GuessThePokemon({
            message: interaction,
            isSlashGame: false,
            embed: {
                title: "Who's The Pokemon ?",
                color: "#FFF000"
            },
            winMessage: 'Well done! That was good `{pokemon}` <:3692pikachusmug:1130133942108946514>',
            loseMessage: "Ouch, ouch, ouch, ouch, ouch it's not good, it was a `{pokemon}`. try your luck again!",
            errMessage: 'Hmm, weird, something went wrong, please try again later.',
            playerOnlyMessage: '{player} is the only person who can use the buttons, if you want to play the game then issue the command.'
        });

        Game.startGame();
    }
}