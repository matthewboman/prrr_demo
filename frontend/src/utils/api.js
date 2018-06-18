import axios from 'axios'

const base_url = `http://localhost:8000/api/cats`

export default {

  getAllCats: () => axios.get(`${base_url}`)
    .then(res => {
      if (res.status === 200) {
        return res.data.result
      }
      throw new Error(res.error)
    }),

  addCat: (cat) => axios.post(`${base_url}`, cat)
    .then(res => {
      if (res.status === 200 || res.status === 201) {
        return res.data.result
      }
      throw new Error(res.error)
    }),

  updateCat: (cat, cat_id) => axios.put(`${base_url}/${cat_id}`, cat)
    .then(res => {
      if (res.status === 200 || res.status === 201) {
        return res.data.result
      }
      throw new Error(res.error)
    }),

  deleteCat: cat_id => axios.delete(`${base_url}/${cat_id}`)
    .then(res => {
      if (res.status === 204) {
        return res.data.result
      }
      // throw new Error(res.error)
    })

}
