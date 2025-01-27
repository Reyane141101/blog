export default async function LoadArticleContent(articleName) 
{
    try 
    {
        const response = await fetch('http://localhost:3001/api/article/content', {
            method: 'GET',
            headers: {
                'article-name': articleName
            }
        });
        if (!response.ok) 
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const content = data.data;
        return content;
    } 
    catch (error) 
    {
        console.error('Erreur lors de la récupération des previews:', error);
        throw error;
    }
}
