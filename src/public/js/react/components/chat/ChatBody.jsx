import React from "react";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        messages: state.chat.messages
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setInput(input) {
            dispatch({
                type: 'SET_INPUT',
                payload: input
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(class ChatBody extends React.Component {
    render() {
        return (
            <div className="chat-body">
                {this.listMessages()}
            </div>
        )
    }

    listMessages() {
        const listButtons = (buttons) => {
            return buttons.map((button, index) => {
                return (
                    <button type="button" className="btn btn-default btn-block" key={index}
                            onClick={()=>this.props.setInput(button.text)}>
                        {button.text}
                    </button>
                )
            });
        };
        console.dir(this.props.messages);
        return this.props.messages.map((message, index) => {
            if (message.type === 'text') {
                return (
                    <div className={
                        'chat-message ' +
                        (message.position === 'self' ? 'chat-message-self ' : ' ')
                    } key={index}>
                        {message.content}
                        <div className="chat-meta">
                            {message.user}
                        </div>
                    </div>
                )
            }
            if (message.type === 'template') {
                return (
                    <div className={
                        'chat-message ' +
                        (message.position === 'self' ? 'chat-message-self ' : ' ')
                    } key={index}>
                        {listButtons(message.items)}
                        <div className="chat-meta">
                            {message.user}
                        </div>
                    </div>
                )
            }
        });
    }
});