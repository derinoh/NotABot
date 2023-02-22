import { GameAttributes } from "../db/models/game";

const { EmbedBuilder } = require('discord.js');

const gameEmbed = (game: GameAttributes) => {
	return new EmbedBuilder()
	//.setColor(0x0099FF)
	.setTitle(game.name)
	.setURL(game.link)
	.setDescription(game.description)
	.addFields(
		{ name: 'Price', value: `$${game.price}`, inline: true },
		{ name: 'Asynchronous', value: game.is_async ? 'Yes' : 'No', inline: true },
		{ name: 'Players', value: `${game.minPlayers}-${game.maxPlayers}`, inline: true }
	)
	.setImage(game.image)
}

export { gameEmbed }
