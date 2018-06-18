import React from 'react'
import './Cat.scss'

const Cat = props =>
  <div className="cat">
    <h2 className="cat-name">{ props.name }</h2>
    <div className="image-container">
      <img src={ props.image_url } />
    </div>
    <p className="cat-bio">{ props.bio }</p>
    <div className="kills">
      <span className="kills-label">Kill count: </span>
      <span className="kill-count">{ props.kills }</span>
    </div>
    <div className="buttons">
      <button className="edit" onClick={ props.edit }>Edit</button>
      <button className="delete" onClick={ props.delete }>Delete</button>
    </div>
  </div>

export default Cat
