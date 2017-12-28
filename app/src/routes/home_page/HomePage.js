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
      artist_name: ''
    }
  }

  handleChange = (event)=> {
    this.setState({text_input_value: event.target.value})
  }


  handleSubmit = (event)=> {

    event.preventDefault()

    let query_string = `${this.state.text_input_value}&api_key=bf3e244da691d8a28c50f8d7aa265d35&format=json`
    const server = fm_api_info()

    server.get(query_string).then(function(data) {

      log('RETURN DATA -> ', data.data)  

      // passState({
      //   genre_tags,
      //   artist_img,
      //   artist_name,
      //   has_data: true
      // })

    }), (error)=> {
      log('ERROR', error)
    }

    const passState = (st)=> {  // eslint-disable-line no-unused-vars
      this.setState(st)
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
                      <header>{thate.artist_name}</header>
                    </div>

                    <div className='flex-row-around' style={{marginTop: '20px'}}>
                      <div className='result-artist-img'>
                        <img src={thate.artist_img} />
                      </div>

                      <div className='result-artist-tags'>
                        genre map here
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