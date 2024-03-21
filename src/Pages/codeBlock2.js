import React, { useState, useEffect } from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';
import Editor from '@monaco-editor/react';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import io from 'socket.io-client';
import 'highlight.js/styles/default.css';


const CodeBlock2 = () => {
    const [code, setCode] = useState(`function countOccurences(str, char) {
        return str.split(char).length - 1;
      }
      countOccurences("test", "t"); // 2`);

    const [typeRole, setRole] = useState('Mentor');

    const socket2 = io('http://localhost:3002');

    useEffect(() => {
        if (socket2) {
            socket2.emit('page_change', '/block2');
        }

        socket2.on('receive_users', ({ users }) => {
            if (users.length > 0) {
                setRole('Student');
            }
        });

        socket2.on('receive_code', ({ newCode }) => {
            setCode(newCode);
        });

        return () => {
            socket2.disconnect();
        };
    }, [socket2]);


    const sendCode = (newCode) => {
        setCode(newCode);

        if (socket2) {
            socket2.emit('send_code', { newCode });
        }
    }

    return (
        <div>
            <div>
                <h1>Code Block 2:</h1>
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

export default CodeBlock2;