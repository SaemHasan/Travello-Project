import React from 'react'

function DemoList(props){

    return(
        <div>
            {props.demos && props.demos.map(demo =>{
                return(
                    <div key={demo.id}>
                        <h1>{demo.name}</h1>
                        <h2>{demo.title}</h2>
                        <p>{demo.description}</p>
                    </div>
                )
            })}
        </div>
    )

}

export default DemoList;