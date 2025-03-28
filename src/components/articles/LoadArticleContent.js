export default async function LoadArticleContent(articleName) 
{
    return fetch('/articles/content/' + articleName)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return response.text();
        })
        .then(content => {
            return content;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de l\'article:', error);
            return null;
        });
}
