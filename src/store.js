import { createStore } from 'redux'

import reducer from './reducer'

export const setupStore = () => {
  return createStore(reducer)
}
