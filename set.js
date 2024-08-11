const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUpOTTJobk5TdHR5UlRadUR1R1FiVFBRdWxvTTZsVzQzRTgrRisyWkZsQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNERTa2JFNndhcDRxUngvcVFDVEdxYTgrZVVIaE0vay8rZmUrTjlXL1NHaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4TjhHNGRaVGN1ZDJ4UE5MbDBnSFJ3TVBENXlVYkNFM0trVmNyTTRUV1dNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLVS9kU2ZyK1dZUHRlQ1NWMmdmN1ljOG40MTgveGVob0NSbkVUc1BBU3k4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVOUTZadHZIMkxYUUphdjlMTXZ5RlBkK2hWNTR0UkxYVVpTdEU4RUxiSDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhDZmk0aGhuamVuOU5nNmdqV3o4Q0JNOVNKbEdGY2R6MGhUMEZIdXVXRUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEdqRnVBcDBmbWFoeXJEWmNpN0ZoV0ppRWlVY0FEb3pXSGNCcGVYdFhrMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibGRNeXl3KzluR3g0dm9OZWRmTlJzM001NEIvOWEzSjBCNVBIeDJFNEJqQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InE5cHRuM2haRXB3NEdWakZ2VUx5dHBhWDNxMkphL1lDUTNmZXF1YzlMK3hBenJOU2xaNnlZKzBaSUo2c0g0dTRYd1hqUGtGeExUSFJZTGZKbzViMGlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE2LCJhZHZTZWNyZXRLZXkiOiJwaGpKNGU0d3M5cVFRbXlJSkVBc1dPQ0FZWXh4VTZ0WkN3YUV6RERiMHZFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJQUFBDUnlJaFNueUJWT24wTlZycXdBIiwicGhvbmVJZCI6IjdjOTRlODA3LTgxZjktNDAwZC05ZjA0LWZmOTBiYmNhNGEyYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2bEtoMzBiQjdYeldUVWh6K0gybmRhRFFxWlE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUEVWNC9vVDRTeHNiYW5ibUpkWS9Ta2VTZHZVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IllLM0pXMUo2IiwibWUiOnsiaWQiOiIyMzQ4MDUwOTM4OTk0OjQwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IklOVkVTVE9SIEZBV0FaIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQZk8ySThHRUxTZTRyVUdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI4bE51UDBoR2pFMUIwclozT2F1dlV6K1VienlEaU0wS2FwbmUzY0o4cFJjPSIsImFjY291bnRTaWduYXR1cmUiOiJQQTM5QzhtVjltN3RPWUlYanVIcmtmYlVzdDBlL1ozZWx2a2gvdVFSekpRV3cxdm55dzNtbFpWd3FNRFhxV2oxT0VRSmRuZmNYTDE3UE5vdWVEYUxDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRFZXSGNrMFlIWW1mTzJRYysralROQWxBaURNNFJTZFlzZTNUT0xFQmRLcmFOOVBMQU8xaGpWNWpYSyszUXl0czZaeUROWmN4NCtvTXo5SWxaSS85aXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MDUwOTM4OTk0OjQwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZKVGJqOUlSb3hOUWRLMmR6bXJyMU0vbEc4OGc0ak5DbXFaM3QzQ2ZLVVgifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjMzNzEzMzB9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "keithkeizzah",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
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
