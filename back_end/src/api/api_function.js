const { getFileContent, getFolderFiles } = require("../external_database/getContentFromDrive");

async function getCategories() 
{
    let categories = await getFileContent("categories.csv")
    return categories   
}

async function getArticlePreviews() 
{
    const previewsFolderID = "1UTFIqC9cSTcdoEztr16JCBufnIsgzOtX";
    let files = await getFolderFiles(previewsFolderID)
    let filesContent = files[1]
    return filesContent
}

async function getArticleContent(articleName) 
{
    let content = await getFileContent(articleName)
    return content   
}

module.exports = { getCategories, getArticlePreviews, getArticleContent};