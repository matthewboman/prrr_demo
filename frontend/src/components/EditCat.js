import React from 'react'
import './EditCat.scss'

const EditCat = props =>
  <div className="edit-cat">
    <div>
      <input
        className="input"
        type="text"
        defaultValue={ props.name }
        onChange={ props.updateName } />
      <label className="label">Name: </label>
    </div>
    <div>
      <input
        className="input"
        type="text"
        defaultValue={ props.image_url }
        onChange={ props.updateImage } />
      <label className="label">Image Url: </label>
    </div>
    <div>
      <textarea
        rows="2"
        className="textarea"
        defaultValue={ props.bio }
        onChange={ props.updateBio } />
      <label className="label">Bio: </label>
    </div>
    <div>
      <input
        className="input"
        type="text"
        defaultValue={ props.kills }
        onChange={ props.updateKills } />
      <label className="label">Kill Count: </label>
    </div>
    <div className="buttons">
      <button className="edit" onClick={ props.saveEdits }>Save Edits</button>
    </div>
  </div>

export default EditCat
