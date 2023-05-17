require('dotenv/config');
// Get methods from discord.js and openai packages
const { Client, IntentsBitField } = require('discord.js');
const { Configuration, OpenAIApi} = require('openai');

const client = new Client({
    intents: [
        //Grabs permissions to read and send messages
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});
//Lets the terminal know when bot is activated
client.on('ready', () => {
    console.log("Bot ready to speak wisdom")
});

const configuration = new Configuration({
    //communicates with OpenAI API
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

client.on('messageCreate', async (message) => {
    // First if statement checks for AI to not respond if the message is from the AI
    if (message.author.bot) return;
    // Checks to ignore messages that are not in the correct Channel ID
    if (message.channel.id !== process.env.CHANNEL_ID) return;
    // Ignore any message starting with !, mainly to use for comment lines in channel
    if (message.content.startsWith('!')) return;

    let conversationLog = [{ role: 'system', content: "You are a friendly chatbot." }]

    await message.channel.sendTyping();
    // Fetches 15 of the previous messages to the conversation log.
    let prevMessages = await message.channel.messages.fetch({limit: 15 });
    prevMessages.reverse();

    prevMessages.forEach((msg) => {
        if (message.content.startsWith('!')) return;
        if (msg.author.id !== client.user.id && message.author.bot) return;
        // If a new person sends a message, we won't use anyone else's ID in the logs
        if (msg.author.id !== message.author.id) return;

        conversationLog.push({
            role: 'user',
            content: msg.content,
        })
    });




    const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
    })

    message.reply(result.data.choices[0].message);
});
// Process token for bot
client.login(process.env.CHATGPT_TOKEN);