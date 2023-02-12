const request = require('request');

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({ intents:4324});
client.on('ready', () => {
  console.log(`Online a bot!`);
});

const json = {}

async function getPlayer(player) {
  const options = {
    method: 'GET',
    url: `https://account.fyremc.hu/api/player/${player}`,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await new Promise((resolve, reject) => {
      request(options, (error, res, body) => {
        if (error) {
          reject(error);
        } else {
          resolve({ res, body });
        }
      });
    });

    json = JSON.parse(response.body);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
  
}

async function getPlayerCount() {
    const options = {
        method: 'GET',
        url: `https://account.fyremc.hu/jatekosszam.php`,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      try {
        const response = await new Promise((resolve, reject) => {
          request(options, (error, res, body) => {
            if (error) {
              reject(error);
            } else {
              resolve({ res, body });
            }
          });
        });
    
        const json = JSON.parse(response.body);
        console.log(`Játékosok ${json}`);
    
      } catch (error) {
        console.error(error);
        return false;
      }
}

getPlayerCount();

client.on("messageCreate", (message) => {
  if (message.content=="WyaxeOnTop Nexuser") {

    if(getPlayer(message[1]) == true) {
      let username = json.data.username;
      let head = json.data.head;
      let skin = json.data.skin;
      let fyrecoin = json.data.fyrecoin;
      let rank = json.data.rank;
      let ranks = json.data.ranks;
      let premium = json.data.premium;
      let ban = json.data.ban;

      //Bedwars
      let bedwarsWins = json.data.bedwars.wins;
      let bedwarsGamesPlayed = json.data.bedwars.games_played;
      let bedwarsKills = json.data.bedwars.kills
      let bedwarsDeaths = json.data.bedwars.deaths;
      let bedwarsBedDestroyed = json.data.bedwars.beds_destroyed
      let bedwarsRank = json.data.bedwars.rank;

      //Skywars
      let skywarsWins = json.data.skywars.wins;
      let skywarsGamesPlayed = json.data.skywars.games_played;
      let skywarsKills = json.data.skywars.kills;
      let skywarsDeaths = json.data.skywars.deaths;
      let skywarsRank = json.data.skywars.rank;

      //Kitpvp
      let kitpvpKills = json.data.kitpvp.kills;
      let kitpvpDeaths = json.data.kitpvp.deaths;
      let kitpvpLevel = json.data.kitpvp.level;
      let kitpvpMoney = json.data.kitpvp.money;
      let kitpvpRank = json.data.kitpvp.rank;

      //Skypvp
      let skypvpKills = json.data.skypvp.kills;
      let skypvpDeaths = json.data.skypvp.deaths;
      let skypvpLevel = json.data.skypvp.level;
      let skypvpRank = json.data.skypvp.rank;


      const DCEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('WyaxeOnTop')
      .setURL('https://discord.gg/w6Gj2w58CU')
      .setAuthor({ name: username, iconURL: head, url: head })
      .setThumbnail(head)
      .addFields(
        { name: 'Bedwars:', value: `\nÖlések: ${bedwarsKills}\nHalálok: ${bedwarsDeaths}\nTört ágyak: ${bedwarsBedDestroyed}` },
        { name: '\u200B', value: '\u200B' }
      )
      .setImage(skin) 
      .setTimestamp()
      .setFooter({ text: 'WyaxeOnTop' });

      channel.send({ embeds: [DCEmbed] });
    } 
  }
});

client.login("");