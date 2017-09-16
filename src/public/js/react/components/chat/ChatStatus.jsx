import React from "react";

export default class ChatStatus extends React.Component {
    render() {
        return (
            <header>
                KalimatAI::{this.props.status}
            </header>
        )
    }
}