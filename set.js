const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0luNHM4YS9CQUZKODFja0szY29vRUVXZDFtVjJPUWYrMTFhaVh3UDRYcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNTlCZGNZSDVRQSt4d1RVYkE5WUdMYmVqck11bVJnNVM3d2c2dmxNUUJBST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTW16SldsbjQwbHlrN1B6Z3NLN2I4U3B0R0hPWE4ybndTVTU2SDlNUDFFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMOTE5cldDbEdlcWM5eS93NldLTGxQVklzU0hzeUxvTTM1Qng2em0relFnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVHdmJDQkxOaXJla0U3WHNsVHlGMHRCMktqNFF2c2pPelhlWlF0TkVlMWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVBL1pqSFNhRnA1WjJScWU1WVgrbUEyL213OGhCZW5Udk5JVHpxSThqVGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY09YRGxnekFXUmlBOXYyN0ZnWmg5cEhMbWhlRm5hZWZSRFNBamlSVUVYRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMGlLeGF6OG93TDBXYjdPeTlRTlZZN0p3cnVPSjY0REZ3Y1ZCZVBnUUREND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVZ2RTdVhyc1ZObVkwUElVMndNMlVJVENnUGg2MTVzN1ZkSUtOamEyWTVaejNkUEhZbXhEeW1ERUNsUDZtZi9JZ1VRbEQ1NW1LdlcxTllWeDJRK2lnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MiwiYWR2U2VjcmV0S2V5IjoiaFlaWUJDVFVrYzF5Ni8weHlxUUprV3h1SmFpUDI1Nnkvb2h6d3Q2bVZDOD0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjYxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6NjEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiejNxcGxGZklUZ0tZNWxLOHBmSi1tdyIsInBob25lSWQiOiIyMzU4NTNhYS0yOWZmLTRlYzYtYjNmMy02MWU0Yzg0YzVkN2EiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTDdUank3MjV6Z2p2K1cyc2pmYmpEdlhQVUR3PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdDVnkxQ25ZdG5IRitxMDVBbmFka05OVlU2dz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJLOERRSjlESCIsIm1lIjp7ImlkIjoiNDA3NzA4MTE5Mjk6NjhAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05XaDVQUUVFTytDNTd3R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IklXUnpubzRicmNtaVdFRnNVRmJOam55S3A4ejVJdnpRVFlnbElUbk8waFk9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im1iUW1YV3hzQlNodDREckwzZGNSaXFqZkt0bzlodmdqU1kzcklrazRUU0dmSTR2enlwb3F6NzQvYmZCS0xEUUp5V1N6SCtjcXVQaGJuVDlUQis3ekJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJSQmthcmxYSXlKVkZTTjVxSkMzdWFEcDEwZnE1OGpMaWx2dnRpTGplSndnTWR3bko3cG1TS0xVL2hzcVd6N1FOUDBLcXUzMUw2aTVmdGlxWDRpT0ppdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjQwNzcwODExOTI5OjY4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNGa2M1Nk9HNjNKb2xoQmJGQld6WTU4aXFmTStTTDgwRTJJSlNFNXp0SVcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzgxMjk3ODksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRml3In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "cosmin",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "0770811929",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
                  ANTIDELETE2 : process.env.ANTIDELETE2 || "yes",
                  ANTIDELETE1 : process.env.ANTIDELETE1 || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANYWAY_MD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
