import { createStore } from 'redux'
import rootReducer from '../reducers/root'

let rootStore = createStore(rootReducer)

export default rootStore