# Not A Bot

## Usage

Run `yarn install`.

Create a `.env` file then add the client id and bot token from the [Discord Developer Portal](https://discord.com/developers/applications).

```
CLIENT_ID=
TOKEN=
```

Create commands in `src/commands` and event handlers in `src/events`.

Run `yarn dev` to start the bot.

Run `yarn deploy-commands` to register command changes.
