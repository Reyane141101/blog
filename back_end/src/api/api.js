import express, { json } from 'express';
import cors from 'cors';

const {getFileContent} = require("../external_database/getFileContent");


const app = express();
app.use(json());
app.use(cors());

app.get('/api/getFileContent', (req, res) => 
{
    const fileName = req.headers['x-file-name'];

    if (!fileName) 
    {
        return res.status(400).json({
            message: "File name is required in the request headers (X-File-Name).",
        });
    }
    getFileContent(fileName)
    .then((content) => {
        res.json({
            message: `Content of the file '${fileName}'`,
            data: content,
        });
    })
    .catch((error) => {
        console.error('Error fetching file content:', error);
        res.status(500).json({
            message: "Error fetching file content",
            error: error.message,
        });
    });
});

app.get('/api/getCategories', (_, res) => {
    getFileContent("categories.csv")
    .then((content) =>{
        res.json(
            {
                message:`List of categories`,
                data: content
            }
        )
    })
    .catch((error) => {
        console.error('Error fetching categories :', error);
        res.status(500).json({
            message: "Error fetching categories",
            error: error.message,
        });
    });

});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});


