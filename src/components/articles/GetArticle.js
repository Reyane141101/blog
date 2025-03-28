import React from 'react';
import { ArticleRender } from './ArticleRender'; 
import LoadArticleContent from './LoadArticleContent';
import TemplatePage from '../shared/TemplateContent';
import { Navigate } from 'react-router-dom';
import CommentsSection from './Comments';

export default function GetArticle({ articleName }) 
{
    const [content, setContent] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [notFound, setNotFound] = React.useState(false);

    React.useEffect(() => {
        const fetchContent = async () => {
            const data = await LoadArticleContent(articleName);

            if (data == null) 
            {
                setNotFound(true);
            } 
            else 
            {
                setContent(data);
            }
            setLoading(false);
        };
        fetchContent();
    }, [articleName]);

    if (loading) 
    {
        return (
            <TemplatePage>
                <div>Loading...</div>
            </TemplatePage>
        );
    }
    if (notFound) 
    {
        return <Navigate to="/not-found" />; 
    }
    return (
        <TemplatePage>
            <ArticleRender content={content}/>
            <CommentsSection/>
        </TemplatePage>
    );
}
