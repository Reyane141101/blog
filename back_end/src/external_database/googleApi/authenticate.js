const { google } = require('googleapis');
const path = require('path');

async function authenticate() 
{
    const keyFile = path.resolve(__dirname, '.pacific-engine-446821-p3-2de793db5e00.json'); 
    const SCOPES = ['https://www.googleapis.com/auth/drive'];
    try 
    {
        const auth = new google.auth.GoogleAuth({
            keyFile: keyFile,
            scopes: SCOPES,
        });
        const oauth2Client = await auth.getClient();
        google.options({ auth: oauth2Client });
        console.log('Authenticated with service account');
    } 
    catch (error) 
    {
        console.error('Error authenticating with the service account:', error);
    }
}

module.exports = { authenticate };
