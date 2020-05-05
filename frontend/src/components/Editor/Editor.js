import React, {useState} from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

export function Editor() {
	const [code, setCode] = useState('');
	const handleChange = (value) => {
		setCode(value);
		console.log(value);
	};
	return (
		<div>
			<AceEditor
				mode="javascript"
				theme="monokai"
				style={{width: '100%'}}
				value={code}
				onChange={handleChange}
				name="UNIQUE_ID_OF_DIV"
				editorProps={{$blockScrolling: true}}
			/>
		</div>
	);
}
