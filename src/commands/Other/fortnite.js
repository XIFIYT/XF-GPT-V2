const { SlashCommandBuilder, EmbedBuilder, EmbedAssertions } = require("discord.js");
const { default: axios } = require("axios")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cosmetic")
        .setDescription("Command for know the info of a fortnite cosmetic")
        .setDefaultMemberPermissions(null)
        .addStringOption(option => option.setName("cosmetic").setDescription("The of cosmetic name to get info!").setRequired(true))
        .addStringOption(opt => opt.setName("type").setDescription("The type cosmetic!").setRequired(true).addChoices(
            {
                name: "Outfit",
                value: "Outfit"
            },
            {
                name: "Backblings",
                value: "backpack"
            },
            {
                name: "Pickaxe",
                value: "pickaxe"
            },
            {
                name: "Glider",
                value: "glider"
            },
            {
                name: "Dance",
                value: "emote"
            },
            {
                name: "Spray",
                value: "spray"
            },
            {
                name: "Toy",
                value: "toy"
            },
            {
                name: "Wrap",
                value: "wrap"
            },
            {
                name: "Loading Screen",
                value: "loadingscreen"
            },
            {
                name: "Music",
                value: "music"
            },
            {
                name: "Trails",
                value: "contrail"
            },
            {
                name: "Banner",
                value: "banner"
            },
            {
                name: "Emoji",
                value: "emoji"
            },
            {
                name: "Pets",
                value: "pet"
            }
        ))
        .addStringOption(opt => opt.setName("language").setDescription("The language info!").setRequired(false).addChoices(
            {
                name: "French",
                value: "fr"
            },
            {
                name: "English",
                value: "en"
            }
        )),

    async execute(interaction, data) {

        const cosmeticName = interaction.options.getString("cosmetic")
        const lang = interaction.options.getString("language") ?? "en"
        const type = interaction.options.getString("type")

        switch (lang) {
            case "en":
                try {
                    const valuApi = await fetch(`https://fortnite-api.com/v2/cosmetics/br/search/all?name=${cosmeticName}&language=${lang}&matchMethod=starts&type=${type}`)
                    const jsonAPI = await valuApi.json();
                    const dataLength = jsonAPI.data;

                    if (!dataLength) {
                        const item = jsonAPI.data;

                        const embed = new EmbedBuilder()
                            .setTitle(`Result for ${item.name}`)
                            .setDescription(`> **Name**: **\`${item.name}\`**\n> **Description**: **\`${item.description}\`**\n> **ID**: **\`${item.id}\`**\n> **Rarity**: **\`${item.rarity.value.displayValue}\`**\n> **Path**: **\`${item.path}\`**\n> **Type**: \`${item.type.value}\`\n\n> **IMAGE**\n> **Featured**: ${item.images.featured ?? "\`None\`"}\n> **Icon**: ${item.images.icon}\n> **SmallIcon**: ${item.images.smallIcon}\n\n> **INTRODUCTION**\n> **Chapter**: \`${item.introduction.chapter}\`\n> **Season**: \`${item.introduction.season}\`\n`)
                            .setTimestamp()
                            .setThumbnail(item.images.icon)
                            .setColor("Random")
                            .setFooter({ text: `${item.name}`, iconURL: `${item.images.icon}` })

                        if (item.variants !== null) {
                            for (let i = 0; i < item.variants.length; i++) {
                                const allVariant = item.variants[i].options;

                                for (let i = 0; i < allVariant.length; i++) {
                                    const variant = allVariant[i]

                                    embed.addFields({
                                        name: `Variante n°${i + 1}.`, value: `> **Name**: **${variant.name}**\n> **Image**: ${variant.image}`
                                    })
                                }
                            }
                        }

                        return interaction.reply({ embeds: [embed] })
                    } else {
                        for (let i = 0; i < jsonAPI.data.length; i++) {
                            const item = jsonAPI.data[i]

                            const embed = new EmbedBuilder()
                                .setTitle(`Result for ${item.name}`)
                                .setDescription(`> **Name**: **\`${item.name}\`**\n> **Description**: **\`${item.description}\`**\n> **ID**: **\`${item.id}\`**\n> **Rarity**: **\`${item.rarity.value.displayValue}\`**\n> **Path**: **\`${item.path}\`**\n> **Type**: \`${item.type.value}\`\n\n> **IMAGE**\n> **Featured**: ${item.images.featured ?? "\`None\`"}\n> **Icon**: ${item.images.icon}\n> **SmallIcon**: ${item.images.smallIcon}\n\n> **INTRODUCTION**\n> **Chapter**: \`${item.introduction.chapter}\`\n> **Season**: \`${item.introduction.season}\`\n`)
                                .setTimestamp()
                                .setThumbnail(item.images.icon)
                                .setColor("Random")
                                .setFooter({ text: `${item.name}`, iconURL: `${item.images.icon}` })

                            if (item.variants !== null) {
                                for (let i = 0; i < item.variants.length; i++) {
                                    const allVariant = item.variants[i].options;

                                    for (let i = 0; i < allVariant.length; i++) {
                                        const variant = allVariant[i]

                                        embed.addFields({
                                            name: `Variante n°${i + 1}.`, value: `> **Name**: **${variant.name}**\n> **Image**: ${variant.image}`
                                        })
                                    }
                                }
                            }

                            interaction.reply({ content: "Success!", ephemeral: true })
                            interaction.channel.send({ embeds: [embed] })
                        }
                    }
                } catch (err) {
                    console.log(err)
                    return interaction.reply({ content: "Cosmetic not found!", ephemeral: true })
                }
                break;

            case "fr":
                try {
                    const valuApi = await fetch(`https://fortnite-api.com/v2/cosmetics/br/search/all?name=${cosmeticName}&language=${lang}&matchMethod=starts&type=${type}`)
                    const jsonAPI = await valuApi.json();

                    if (!jsonAPI.data.length) {
                        const embed = new EmbedBuilder()
                            .setTitle(`Résultat pour ${jsonAPI.data.name}`)
                            .setDescription(`> **NOM**: **\`${jsonAPI.data.name}\`**\n> **Description**: **\`${jsonAPI.data.description}\`**\n> **IDENTIFIANT**: **\`${jsonAPI.data.id}\`**\n> **Rareté**: **\`${jsonAPI.data.rarity.displayValue}\`**\n> **Chemin**: **\`${jsonAPI.data.path}\`**\n\n> **IMAGE**\n> **Grande**: ${jsonAPI.data.images.featured ?? "\`Aucune\`"}\n> **Icon par défaut**: ${jsonAPI.data.images.icon}\n> **Petite icon**: ${jsonAPI.data.images.smallIcon}\n\n> **Introduction**\n> **Chapitre**: \`${jsonAPI.data.introduction.chapter}\`\n> **Saison**: \`${jsonAPI.data.introduction.season}\`\n`)
                            .setTimestamp()
                            .setThumbnail(jsonAPI.data.images.icon)
                            .setColor("Random")
                            .setFooter({ text: `${jsonAPI.data.name}`, iconURL: `${jsonAPI.data.images.icon}` })

                        if (jsonAPI.data.variants !== null) {
                            for (let i = 0; i < jsonAPI.data.variants.length; i++) {
                                const allVariant = jsonAPI.data.variants[i].options;

                                for (let i = 0; i < allVariant.length; i++) {
                                    const variant = allVariant[i]

                                    embed.addFields({
                                        name: `Variante n°${i + 1}.`, value: `> **Nom**: **${variant.name}**\n> **Image**: ${variant.image}`
                                    })
                                }
                            }
                        }

                        interaction.reply({ content: "Success!", ephemeral: true })
                        interaction.channel.send({ embeds: [embed] })
                    } else {
                        for (let i = 0; i < jsonAPI.data.length; i++) {
                            const item = jsonAPI.data[i]

                            const embed = new EmbedBuilder()
                                .setTitle(`Résultat pour ${item.name}`)
                                .setDescription(`> **NOM**: **\`${item.name}\`**\n> **Description**: **\`${item.description}\`**\n> **IDENTIFIANT**: **\`${item.id}\`**\n> **Rareté**: **\`${item.rarity.displayValue}\`**\n> **Chemin**: **\`${item.path}\`**\n\n> **IMAGE**\n> **Grande**: ${item.images.featured ?? "\`Aucune\`"}\n> **Icon par défaut**: ${item.images.icon}\n> **Petite icon**: ${item.images.smallIcon}\n\n> **Introduction**\n> **Chapitre**: \`${item.introduction.chapter}\`\n> **Saison**: \`${item.introduction.season}\`\n`)
                                .setTimestamp()
                                .setThumbnail(item.images.icon)
                                .setColor("Random")
                                .setFooter({ text: `${item.name}`, iconURL: `${item.images.icon}` })

                            if (item.variants !== null) {
                                for (let i = 0; i < item.variants.length; i++) {
                                    const allVariant = item.variants[i].options;

                                    for (let i = 0; i < allVariant.length; i++) {
                                        const variant = allVariant[i]

                                        embed.addFields({
                                            name: `Variante n°${i + 1}.`, value: `> **Nom**: **${variant.name}**\n> **Image**: ${variant.image}`
                                        })
                                    }
                                }
                            }

                            interaction.reply({ content: "Success!", ephemeral: true })
                            interaction.channel.send({ embeds: [embed] })
                        }
                    }
                } catch (err) {
                    console.log(err)
                    return interaction.reply({ content: "Cosmetic introuvable !", ephemeral: true })
                }
        }
    }
}