export const FETCH_DOGS__START = 'FETCH_DOGS_START'
export const FETCH_DOGS__SUCCESS = 'FETCH_DOGS_SUCCESS'
export const FETCH_DOGS__FAILURE = 'FETCH_DOGS_FAILURE'

export const UPDATE_BREED__SUCCESS = 'UPDATE_BREED_SUCCESS'

export const FETCH_IMAGES__START = 'FETCH_IMAGES__START'
export const FETCH_IMAGES__DONE = 'FETCH_IMAGES__DONE'

export const SEARCH_SUMMARY = 'SEARCH_SUMMARY'

export const fetchDogsStart = () => ({
  type: FETCH_DOGS__START,
  payload: {
    breeds: null,
    fetchDogsFail: false
  }
})

export const fetchDogsSuccess = ({ breeds }) => ({
  type: FETCH_DOGS__SUCCESS,
  payload: {
    breeds
  }
})

export const fetchDogsFailure = () => ({
  type: FETCH_DOGS__FAILURE,
  payload: {
    fetchDogsFail: true
  }
})

export const updateBreedSuccess = ({ breed }) => ({
  type: UPDATE_BREED__SUCCESS,
  payload: {
    breed
  }
})

export const fetchImagesStart = () => ({
  type: FETCH_IMAGES__START,
  payload: {
    fetchedImages: false,
    fetchingImages: true
  }
})

export const fetchImagesDone = () => ({
  type: FETCH_IMAGES__DONE,
  payload: {
    fetchedImages: true,
    fetchingImages: false
  }
})

export const searchSummary = token => ({
  type: SEARCH_SUMMARY,
  payload: {
    searchToken: token
  }
})
