// DEPENDENCIES
import store from '../store/store'  // eslint-disable-line no-unused-vars
import axios from 'axios'  // eslint-disable-line no-unused-vars

// DEV
const log = console.log // eslint-disable-line no-unused-vars

export function fm_api_info() {
  return axios.create({
    baseURL: 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='  
  })
}

export function fm_api_search() {
  return axios.create({
    baseURL: 'https://ws.audioscrobbler.com/2.0/?method=artist.search&artist='   
  })
}

