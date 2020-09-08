import { SAVE_MESSAGE } from "../actions/types";

// 비어있는 리스트의 store 생성
export default function (state = { messages: [] }, action) {
  switch (action.type) {
    case SAVE_MESSAGE:
      return {
        ...state,
        // messages 데이터를 redux store에 추가함
        messages: state.messages.concat(action.payload),
      };
    default:
      return state;
  }
}
