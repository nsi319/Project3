import React, {useEffect, useState} from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

export default function Socket() {
	const [val, setVal] = useState('');
	const path = 'ws://localhost:8000/ws/chat';
	const socketRef = new ReconnectingWebSocket(path);
	socketRef.onopen = () => {
		console.log('WebSocket open');
	};
	socketRef.onmessage = (e) => {
		let data = JSON.parse(e.data);
		console.log('in', data);
		setVal(data);
	};

	socketRef.onerror = (e) => {
		console.log(e.message);
	};
	socketRef.onclose = () => {
		console.log("WebSocket closed let's reopen");
	};

	const handleChange = (e) => {
		let value = e.target.value;
		console.log(value);
		let d = JSON.stringify({
			text: value,
		});
		console.log(d);
		socketRef.send(d);
	};

	return (
		<div>
			<input type="text" onChange={handleChange}></input>
			<h2>message back from server</h2>
			<p style={{margin: '5px', fontSize: '20px'}} id="msg">
				{val}
			</p>
		</div>
	);
}
