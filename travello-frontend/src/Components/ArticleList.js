import React from 'react'

function ArticleList(props){

    return(
        <div>
            {props.articles && props.articles.map(article =>{
                return(
                    <div key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                    </div>
                )
            })}
        </div>
    )

}

export default ArticleList;