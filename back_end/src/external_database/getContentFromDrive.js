const {google} = require('googleapis');
const {authenticate} = require('./googleApi/authenticate');
const yaml = require('js-yaml')

async function getContent(fileId, drive) 
{
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
            console.error('Error :No files found.');
            return null;
        }
        else if (files.length > 1)
        {
            console.error('Error :Multiple occurence with same file name found');
            return null;
        }
        const file = files[0];
        const content = await getContent(file.id, drive)
        return content
    } 
    catch (error) 
    {
        console.error('Error listing or reading files:', error);
        return null;
    }
}

async function getFolderFiles(folderId) 
{
    await authenticate();
    const drive = google.drive({ version: 'v3' });
    try {
        const files = await listFilesInFolder(folderId, drive);

        const fileContents = await Promise.all(
            files.map(async (file) => {
                return await getContent(file.id, drive);
            })
        );
        const fileNames = files.map(file => file.name)
        return [fileNames, fileContents];
    } 
    catch (error) 
    {
        console.error("Erreur dans getFolderFiles :", error);
        throw error;
    }
}

async function listFilesInFolder(folderId, drive)
{
    try 
    {
        const response = await drive.files.list({
            q: `'${folderId}' in parents`,
            fields: 'files(id, name)',
        });

        const files = response.data.files;

        if (!files || files.length === 0) 
        {
            console.log("Aucun fichier trouvé dans ce dossier.");
            return [];
        }

        let allFiles = [];
        allFiles = allFiles.concat(files); 

        return files;
    }
    catch (error) 
    {
        console.error('Erreur lors de la récupération des fichiers :', error);
        throw error;
    }
}

module.exports = { getFileContent, getFolderFiles };

