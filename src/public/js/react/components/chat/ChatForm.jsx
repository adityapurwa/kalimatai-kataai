import React from "react";
import {connect} from "react-redux";

const mapDispatchToProps = dispatch => {
    return {
        addMessage(message) {
            dispatch({
                type: 'ADD_MESSAGE',
                payload: {
                    position: 'self',
                    type: 'text',
                    content: message
                }
            });
        },
        setInput(input) {
            dispatch({
                type: 'SET_INPUT',
                payload: input
            })
        }
    }
};
const mapStateToProps = state => {
    return {
        socket: state.chat.socket,
        input: state.chat.input
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(class ChatForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleMessageEnter = this.handleMessageEnter.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    handleMessageChange(event) {
        this.props.setInput(event.target.value);
        this.props.socket.emit('ping_typing');
    }

    handleMessageEnter(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.sendMessage();
        }
    }

    sendMessage() {
        this.props.addMessage(this.props.input);
        this.props.socket.emit('send_message', {
            content: this.props.input
        });
        this.props.setInput('');
    }

    render() {
        return (
            <div className="chat-form">
                <div className="input-group">
                    <input type="text" className="form-control"
                           value={this.props.input}
                           onChange={this.handleMessageChange}
                           onKeyDown={this.handleMessageEnter}
                           disabled={this.props.disabled}
                           placeholder="Type your message here"/>
                    <span className="input-group-btn">
                        <button className="btn btn-primary" disabled={this.props.disabled}
                                onClick={this.sendMessage}>
                            Send
                        </button>
                    </span>
                </div>
            </div>
        )
    }
})
