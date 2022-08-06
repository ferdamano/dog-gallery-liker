import {
  FETCH_DOGS__START,
  FETCH_DOGS__SUCCESS,
  FETCH_DOGS__FAILURE,
  UPDATE_BREED__SUCCESS,
  FETCH_IMAGES__START,
  FETCH_IMAGES__DONE,
  SEARCH_SUMMARY
} from './actions'
import { combineReducers } from 'redux'

const initialState = {
  breeds: [],
  fetchedImages: false,
  fetchingImages: false,
  searchToken: ''
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_DOGS__START:
      return {
        ...state,
        breeds: null,
        fetchDogFailure: false
      }

    case FETCH_DOGS__SUCCESS:
      return {
        ...state,
        breeds: payload.breeds
      }

    case FETCH_DOGS__FAILURE:
      return {
        ...state,
        fetchDogFailure: true
      }

    case UPDATE_BREED__SUCCESS:
      const updatedBreed = payload.breed
      return {
        ...state,
        breeds: state.breeds.map(d => (d.id === updatedBreed.id ? { ...d, ...updatedBreed } : d))
      }

    case FETCH_IMAGES__START:
      return {
        ...state,
        fetchedImages: payload.fetchedImages,
        fetchingImages: payload.fetchingImages
      }

    case FETCH_IMAGES__DONE:
      return {
        ...state,
        fetchedImages: payload.fetchedImages,
        fetchingImages: payload.fetchingImages
      }

    case SEARCH_SUMMARY:
      return {
        ...state,
        searchToken: payload.searchToken
      }

    default:
      return state
  }
}

export default reducer
