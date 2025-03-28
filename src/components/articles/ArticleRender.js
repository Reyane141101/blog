import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { compile } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { run } from "@mdx-js/mdx";
import { CenteredText, CodeBlock, Image } from "./ArticleComponents";


export const ArticleRender = ({ content }) => 
{
  const [mdxContent, setMdxContent] = React.useState(null);
  React.useEffect(() => 
  {
    async function compileMDX() 
    {
      try 
      {
        const compiled = await compile(content, 
        {
          outputFormat: "function-body",
          remarkPlugins: [],
          rehypePlugins: [],
        });
        const { default: MDXContent } = await run(
          compiled, 
          { ...runtime }
        );
        setMdxContent(() => MDXContent);
      } 
      catch (err) 
      {
        console.error("Error while parsing .mdx file :", err)
      }
    }
    compileMDX();
  }, [content]);

  return (
    <MDXProvider>
       {mdxContent ? React.createElement(mdxContent, { components: { CenteredText, CodeBlock, Image } }) : null}
    </MDXProvider>
  );
};
