import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import io from 'socket.io-client';


const CodeBlock4 = () => {
    const [code, setCode] = useState(`function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      randomBetween(1,5);`);

    const [typeRole, setRole] = useState('Mentor');

    const socket4 = io('https://code-editor24.onrender.com:10000');

    useEffect(() => {
        if (socket4) {
            socket4.emit('page_change', '/block4');
        }

        socket4.on('receive_users', ({ users }) => {
            if (users.length > 0) {
                setRole('Student');
            }
        });

        socket4.on('receive_code', ({ newCode }) => {
            setCode(newCode);
        });

        return () => {
            socket4.disconnect();
        };
    }, [socket4]);


    const sendCode = (newCode) => {
        setCode(newCode);

        if (socket4) {
            socket4.emit('send_code', { newCode });
        }
    }

    return (
        <div>
            <div>
                <h1>Code Block 4:</h1>
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

export default CodeBlock4;