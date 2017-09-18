import React from "react";
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