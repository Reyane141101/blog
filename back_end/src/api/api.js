const express = require('express');
const cors = require('cors');
const { json } = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { getArticlePreviews, getCategories, getArticleContent} = require("./api_function");

const app = express();

/*var corsOptions = {
    origin: 'https://olympe.vercel.app/',
    optionsSuccessStatus: 200
  }*/
app.use(json());
app.use(cors());

// Swagger options
const swaggerOptions = 
{
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'File Content API',
            version: '1.0.0',
            description: 'API to fetch file content and categories.',
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Local server',
            },
        ],
    },
    apis: [__filename], // Points to this file for Swagger annotations
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/getCategories:
 *   get:
 *     summary: Fetch the list of categories from the categories.csv file.
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *       500:
 *         description: Error fetching categories.
 */
app.get('/api/getCategories', (_, res) => 
{
    console.log("Received request of /api/getCategories")
    getCategories()
        .then((content) => res.json({data: content}))
        .catch((error) => 
        {
            console.error('Error fetching categories :', error);
            res.status(500).json({
                message: "Internal Error",
                error: error.message,
            });
        });
}); 

/**
 * @swagger
 * /api/article/previews:
 *   get:
 *     summary: Récupère les aperçus des articles
 *     description: Cette API récupère les fichiers d'aperçu d'un article à partir d'un dossier spécifique.
 *     responses:
 *       200:
 *         description: Succès de la récupération des fichiers d'aperçu.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Content of the file 'articleName'"
 *                 data:
 *                   type: object
 *                   description: Contenu des fichiers d'aperçu.
 *                   additionalProperties: true
 *       404:
 *         description: Fichier non trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "File not found: articleName"
 *                 data:
 *                   type: object
 *                   description: Contenu nul ou non disponible.
 *                   nullable: true
 *       500:
 *         description: Erreur lors de la récupération du contenu.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching file content"
 *                 error:
 *                   type: string
 *                   example: "Error message describing the failure"
 */
app.get('/api/article/previews', (_, res) => 
{
    console.log("Received request of /api/article/previews")
    getArticlePreviews()
        .then((content) => res.json({data: content}))
        .catch((error) => 
        {
            console.error('Error fetching previews content:', error);
            res.status(500).json({
                message: "Internal Error",
                error: error.message
            });
        });
});

/**
 * @swagger
 * /api/article/content:
 *   get:
 *     summary: Retrieve the content of an article
 *     parameters:
 *       - in: header
 *         name: article-name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the article to retrieve
 *     responses:
 *       200:
 *         description: Successful response with article content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: The content of the article
 *       400:
 *         description: Bad Request if the article name is missing in the header
 *       500:
 *         description: Internal server error
 */
app.get('/api/article/content', (req, res) => 
{
    console.log("Received request of /api/article/content");
    
    const articleName = req.header('article-name');
    
    if (!articleName || articleName === "") 
    {
        return res.status(400).json({ message: "Bad Request: 'article-name' header is required" });
    }
    
    getArticleContent(articleName)
        .then((content) => res.json({ data: content }))
        .catch((error) => 
        {
            console.error('Error fetching article content:', error);
            res.status(500).json({
                message: "Internal Error",
                error: error.message
            });
        });
});


module.exports = app;

