import React from "react";
import ChatStatus from "./ChatStatus";
import {connect} from "react-redux";
import ChatForm from "./ChatForm";
import ChatBody from "./ChatBody";

const mapDispatchToProps = dispatch => {
    return {
        setConnectionStatus(status) {
            dispatch({
                type: 'SET_STATUS',
                payload: status
            });
        },
        setCurrentId(id) {
            dispatch({
                type: 'SET_USER_ID',
                payload: id
            })
        },
        setConnection(socket) {
            dispatch({
                type: 'SET_CONNECTION',
                payload: socket
            })
        },
        addMessage(message) {
            dispatch({
                type: 'ADD_MESSAGE',
                payload: message
            })
        }
    }
};

const mapStateToProps = state => {
    return {
        chat: state.chat
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(class ChatBox extends React.Component {
    render() {
        return (
            <div className="chat-box">
                <ChatStatus status={this.props.chat.status}/>
                <ChatBody/>
                <ChatForm
                    disabled={this.props.chat.status !== 'connected' && this.props.chat.status !== 'someone is typing'}/>
            </div>
        )
    }

    componentDidMount() {
        this.props.setConnectionStatus('connecting');
        const socket = io.connect();
        socket.on('id_assigned', (id) => {
            this.props.setCurrentId(id);
        });
        socket.on('new_message', (message) => {
            message.position = "opposite";
            this.props.addMessage(message);
        });
        let typingBouncer = null;
        socket.on('ping_typing', () => {
            this.props.setConnectionStatus('someone is typing');
            if (typingBouncer) {
                clearInterval(typingBouncer);
            }
            // If no one is sending ping_typing after 3 seconds, reset the connection status
            typingBouncer = setTimeout(() => {
                this.props.setConnectionStatus('connected');
            }, 3000);
        });
        // Should we store socket in redux store?
        this.props.setConnection(socket);
        this.props.setConnectionStatus('connected');
    }
})