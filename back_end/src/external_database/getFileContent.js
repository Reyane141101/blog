import { google } from 'googleapis';
import { authenticate } from './googleApi/authenticate';

async function getContent(fileId) 
{
    try 
    {
        const drive = google.drive({ version: 'v3' });
        const response = await drive.files.get(
            { 
                fileId: fileId, 
                alt: 'media',
            },
            { responseType: 'stream' }
        );
        const chunks = [];
        await new Promise((resolve, reject) => {
            response.data
                .on('data', (chunk) => chunks.push(chunk))
                .on('end', () => resolve())
                .on('error', (err) => reject(err));
        });
        const fileContent = Buffer.concat(chunks).toString('utf-8');
        return fileContent;
    } 
    catch (error) 
    {
        console.error(`Error downloading file with ID ${fileId}:`, error);
        return null;
    }
}

async function getFileContent(articleName) 
{
    try
    {
        await authenticate();
        const drive = google.drive({ version: 'v3' });
        const res = await drive.files.list({
            q: `name = '${articleName}'`,
            pageSize: 10,
            fields: 'files(id, name, mimeType, parents)',
        });
        const files = res.data.files;
        if (!files || files.length === 0) 
        {
            console.log('Error :No files found.');
            return;
        }
        else if (files.length > 1)
        {
            console.log('Error :Multiple occurence with same file name found');
            return;
        }
        const file = files[0];
        console.log(`Downloading and parsing ${file.name}...`);

        const content = await getContent(file.id)
        return content
    } 
    catch (error) 
    {
        console.error('Error listing or reading files:', error);
    }
}

export default { getFileContent };
