import React from "react";
import ReactDOM from "react-dom";
import App from "./react/components/App";
import {createStore, combineReducers} from "redux";
import ChatReducer from "./react/redux/reducers/ChatReducer";
import {Provider} from "react-redux";

const store = createStore(combineReducers({
    chat: ChatReducer
}));

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById("app"));