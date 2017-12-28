const init_state = {
  name: 'cpardat' 
}

// DEV
const log = console.log // eslint-disable-line no-unused-vars


export function app_reducer(state = init_state, action) {
  
  switch (action.type) {

//  ....
    case 'GET_DATA':
      return {
        ...state,
        cData: [action.action]
      }
//  ....


    default:
      return state

//  ....
  }
}
