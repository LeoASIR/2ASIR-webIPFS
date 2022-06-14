import React from "react";
import crypto from "crypto";

export const ChatComponent = ({
    node,
}: {
    node: any
}) => {
    const CHAT_ID = 'eleogub1515';
    const [ messages, setMessages ] = React.useState<string[]>([]);
    const [ message, setMessage ] = React.useState<string>('');

    
    React.useEffect(() => {
        node.pubsub.subscribe(CHAT_ID, (msg: any) => {
            setMessages(messages => [...messages, msg.data.toString()]);
        });
    });

    const sendMessage = () => {
        node.pubsub.publish(CHAT_ID, message);
        setMessage('');
    }

    return (<div className="chat">
        <div className="messages">
            { messages.map((msg: string) => <div key={msg}>{msg}</div>) }
        </div>
        <div className="input">
            <input value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>);
}