const initialState = {
  items : {

  }
}

export function resolutions(state = initialState, action) {
  switch (action.type) {

  case 'REPLACE_RESOLUTION_ITEMS': 
    return {
      items : {
        ...action.resolutions
      }
    }
  case 'KEEP_RESOLUTION_ITEMS': {
    return {
      items: {
        ...state.items
      }
    }
  }

  default:
    return state;
  }
}
