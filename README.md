# GPTBot
For your .env file, you should include 3 things:
  1. Your openai API Key, known as API_KEY in chatGPT.js
  2. Your CHANNEL_ID, which is where your bot will be messaging in your Discord server
  3. Your bot token, known as CHATGPT_TOKEN in chatGPT.js
The purpose of this project is to create a bot in Discord that utilizes the ChatGPT API and will be, in short, your very own
personal AI bot. The bot remembers the past 15 messages from the user to retain context of the current conversation, and will
differentate by user. In other words, if the bot is conversating with a user and another user asks a question, the bot will
respond to that user, but not with the context of the other user. Therefore, only one-on-one conversations are possible.
