import React, { useState, useEffect } from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';
import Editor from '@monaco-editor/react';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import io from 'socket.io-client';
import 'highlight.js/styles/default.css';


const CodeBlock3 = () => {
    const [code, setCode] = useState(`const string = "hello world";
    const substring = "world";
    const containsSubstring = string.includes(substring); //true`);

    const [typeRole, setRole] = useState('Mentor');

    const socket3 = io('http://localhost:3003');

    useEffect(() => {
        if (socket3) {
            socket3.emit('page_change', '/block3');
        }

        socket3.on('receive_users', ({ users }) => {
            if (users.length > 0) {
                setRole('Student');
            }
        });

        socket3.on('receive_code', ({ newCode }) => {
            setCode(newCode);
        });

        return () => {
            socket3.disconnect();
        };
    }, [socket3]);


    const sendCode = (newCode) => {
        setCode(newCode);

        if (socket3) {
            socket3.emit('send_code', { newCode });
        }
    }

    return (
        <div>
            <div>
                <h1>Code Block 3:</h1>
                <h3>Logged on as a: {typeRole}</h3>
                <Editor
                    lineNumbers='off'
                    height="75vh"
                    theme='vs-dark'
                    options={{ readOnly: (typeRole === 'Mentor' ? true : false) }}
                    defaultLanguage="javascript"
                    value={code}
                    onChange={newCode => sendCode(newCode)}
                />
            </div>
        </div>
    );
}

export default CodeBlock3;