// DEPENDENCIES
import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'  // eslint-disable-line no-unused-vars

require('babel-polyfill')

// API
import { fm_api_info, fm_api_search } from '../../components/api/app'  // eslint-disable-line no-unused-vars


// DEV
const log = console.log // eslint-disable-line no-unused-vars
const warn = console.warn // eslint-disable-line no-unused-vars
const api_key = '&api_key=bf3e244da691d8a28c50f8d7aa265d35&format=json'
// COMPONENTS
 // API


class HomePage extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      text_input_value: '',
      tags: [],
      has_data: false,
      genre_tags: [],
      artist_img: '',
      artist_name: '',
      artist_list: []
    }
  }

  handleChange = (event)=> {
    
    this.setState({text_input_value: event.target.value})
    const _pass = (pass)=> {
      this.setState({artist_list: pass})
    }

    let query_string = `${event.target.value}${api_key}`

    // fm_api_search

    const server = fm_api_search()

    server.get(query_string).then(function(data) {

      warn('RETURN SEARCH DATA -> ', data.data)  

      var tags = data.data.results.artistmatches.artist
      var tagsSliced = tags.slice(0, 1)
      var tagsSlicedRes = tagsSliced[0].name.split('/')[1].toUpperCase()
      _pass(tagsSlicedRes)

    }), (error)=> {
      log('ERROR', error)
    }
  }




  handleSubmit = (event)=> {

    event.preventDefault()

    const _pass = (pass)=> {
      this.setState(pass)
    }

    let artist = `${this.state.artist_list.toUpperCase()}`


    let query_string = `${artist}${api_key}`
    const server = fm_api_info()

    server.get(query_string).then(function(data) {

      warn('RETURN INFO DATA -> ', data)  

      var tags = data.data.artist.tags.tag
      var name = data.data.artist.name.split('/')[1].toUpperCase()
      var img = data.data.artist.image[3]['#text']
      

      log('TAGS', tags)
      log('NAME', name)
      
      _pass({
        genre_tags: tags,
        artist_img: img,
        artist_name: name,
        has_data: true
      })

    }), (error)=> {
      log('ERROR', error)
    }



  }

  render() {

    const thate = this.state 

    // log(thate)

    return (
      <div className='app-component-wrapper'>

        <div className='homepage-component'>

          <div className='homepage-header'>
            <header>
              <h1>Which Genre is This?</h1>
            </header>
          </div>

          <div className='homepage-form flex-row-around'>
            <form onSubmit={this.handleSubmit}>
              <label>
                Search Artist: 
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" className='homepage-submit' />

            </form>
          </div>
          <div>

          {
            (()=> {
              if (thate.has_data) {
                return (

                  <div className='homepage-result'>

                    <div className='result-artist-name'>
                      <header>
                        {thate.artist_name}
                      </header>
                    </div>

                    <div className='flex-row-around' style={{marginTop: '20px'}}>

                      <div className='result-artist-img'>
                        {
                          (()=> {
                            if (thate.artist_img !== '') {
                              return (
                                <img src={thate.artist_img} />
                              )
                            } else {
                              return (
                                <p>No Image Found</p>
                              )
                            }
                          })()
                        }
                      </div>

                      <div className='result-artist-tags'>
                        {
                          (()=> {
                            if (thate.tags.length > 0) {
                              return (
                                <div>
                                  {
                                    thate.tags.map((tag, i)=> {
                                      return (
                                        <p key={i}>{tag}</p>
                                      )
                                    })
                                  }
                                </div>
                              )
                            } else {
                              return (
                                <p>No Tags Found</p>
                              )
                            }
                          })()
                        }
                      </div>
                    </div>
                  </div>
                )
              }
            })()
          }

          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => ({
    sys_state: state
})

HomePage.propTypes = {
  sys_state: PropTypes.object
}

export default connect(mapStateToProps)(HomePage)