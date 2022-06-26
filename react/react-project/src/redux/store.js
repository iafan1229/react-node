import { createStore } from 'redux';
import reducers from './reducer';

//store공간을 생성한 다음 전달된 reducer를 store에 저장해서 내보냄
const store = createStore(reducers);
export default store;
