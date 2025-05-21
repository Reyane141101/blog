import { useParams } from 'react-router-dom';
import GetArticle from '../components/articles/GetArticle';


export default function ArticlePage() 
{
  let articleId = useParams();
  let ArticleName = articleId['*'] + '.mdx'
  return (
    <GetArticle articleName={ArticleName}/>
    );
}
