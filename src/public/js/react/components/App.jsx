import React from "react";
import ChatStatus from "./chat/ChatStatus";
import ChatBox from "./chat/ChatBox";


export default class App extends React.Component {
    render() {
        return (
            <div className="chat-container">
               <ChatBox/>
            </div>
        )
    }
}