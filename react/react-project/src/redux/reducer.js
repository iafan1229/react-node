import { combineReducers } from 'redux';

//초기데이터를 state에 저장했다가
//추후 action객체가 전달되면
//action객체의 타입에 따라 기존 데이터를 변경해서 리턴
const init = [];

const memberReducer = (state = init, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };

		default:
			return state;
	}
};

//전달된 각각의 reducer를 하나도 합쳐서 반환
const reducers = combineReducers({
	memberReducer,
});

export default reducers;
