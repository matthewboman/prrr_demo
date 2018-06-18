import React, { Component } from 'react'

import Cat from './components/Cat'
import EditCat from './components/EditCat'
import api from './utils/api'
import './App.scss'

window.onclick = event => {
  if (event.target === modal) {
    modal.classList.toggle('show')
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cats: [],
      editingCat: null,
      isNew: false,
    }
  }

  componentDidMount = () => {
    api.getAllCats()
      .then(cats => {
        this.setState({ cats: cats }
      )})
  }

  editCat = (cat) => {
    this.setState({ editingCat: cat, isNew: false })
    this.toggleModal()
  }

  updateName = e => {
    const cat = { ...this.state.editingCat, name: e.target.value }
    this.setState({ editingCat: cat})
  }

  updateImage = e => {
    const cat = { ...this.state.editingCat, image_url: e.target.value }
    this.setState({ editingCat: cat})
  }

  updateBio = e => {
    const cat = { ...this.state.editingCat, bio: e.target.value }
    this.setState({ editingCat: cat})
  }

  updateKills = e => {
    const cat = { ...this.state.editingCat, kills: parseInt(e.target.value) }
    this.setState({ editingCat: cat})
  }

  saveEdits = () => {
    const cat = {
      name: this.state.editingCat.name,
      image_url: this.state.editingCat.image_url,
      bio: this.state.editingCat.bio,
      kills: this.state.editingCat.kills
    }
    api.updateCat(cat, this.state.editingCat.id)
      .then(res => {
        this.setState({ editingCat: null, cats: res, editingCat: false })
        this.toggleModal()
      })
  }

  addNewCat = () => {
    const cat = {
      name: "",
      image_url: "",
      bio: "",
      kills: ""
    }
    this.setState({ editingCat: cat, isNew: true })
    this.toggleModal()
  }

  saveNewCat = () => {
    const cat = {
      name: this.state.editingCat.name,
      image_url: this.state.editingCat.image_url,
      bio: this.state.editingCat.bio,
      kills: this.state.editingCat.kills
    }
    api.addCat(cat)
      .then(res => {
        this.setState({ cats: res})
        this.toggleModal()
      })
  }

  deleteCat = (cat) => {
    api.deleteCat(cat.id)
      .then(res => {
        const cats = this.state.cats.filter(c => c.id != cat.id)
        this.setState({ cats: cats })
      })
  }

  toggleModal = () => {
    const modal = document.getElementById('modal')
    modal.classList.toggle('show')
  }

  renderCats = () => this.state.cats.map(cat =>
    <Cat key={cat.id}
         name={cat.name}
         image_url={cat.image_url}
         bio={cat.bio}
         kills={cat.kills}
         edit={e => this.editCat(cat)}
         delete={e => this.deleteCat(cat)}
    />
  )

  renderEditModal = () =>
    <EditCat
      name={this.state.editingCat.name}
      image_url={this.state.editingCat.image_url}
      bio={this.state.editingCat.bio}
      kills={this.state.editingCat.kills}
      updateName={this.updateName}
      updateImage={this.updateImage}
      updateBio={this.updateBio}
      updateKills={this.updateKills}
      saveEdits={this.state.isNew ? this.saveNewCat : this.saveEdits} />


  render = () =>
    <div className="page">
      <h1>PrrrStack Cat Demo</h1>
      <div className="container">
        <button className="add" onClick={this.addNewCat}>Add another cat</button>
      </div>
      <div className="container">
        { this.renderCats() }
        <div id="modal" className="modal">
          <div className="modal-content">
            { this.state.editingCat ? this.renderEditModal() : '' }
          </div>
        </div>
      </div>
    </div>
}
