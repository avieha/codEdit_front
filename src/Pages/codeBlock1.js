import React, { useState, useEffect } from 'react';
// import { highlight, languages } from 'prismjs/components/prism-core';
import Editor from '@monaco-editor/react';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/themes/prism.css';
import io from 'socket.io-client';
// import 'highlight.js/styles/default.css';
import './codeBlock1.css'

// i added notes in this file but not in the other codeBlocks
// but they are just the same.


const CodeBlock1 = () => {
    const [code, setCode] = useState(`function reverseString(str) {
        return str.split("").reverse().join("");
    }`);

    // determines who's watching the page, mentor/student
    const [typeRole, setRole] = useState('Student');

    //Sets the smiley for the right solution!!
    // works ONLY on CodeBlock1
    const [showSmiley, setShowSmiley] = useState(false);
    const solution = "HEY!";

    const socket1 = io('http://localhost:10000');

    useEffect(() => {
        // reports to the server on page changed
        if (socket1) {
            socket1.emit('page_change', '/block1');
        }

        //if there are more than one viewer, they are students.
        socket1.on('receive_users', ({ users }) => {
            if (users.length > 0) {
                setRole('Student');
            }
        });

        // code is being broadcasted live from another user
        socket1.on('receive_code', ({ newCode }) => {
            setCode(newCode);
            // Check if the inserted code is correct
            if (newCode.toString() === solution) {
                setShowSmiley(true);
                setTimeout(() => setShowSmiley(false), 10000); // Hide the smiley after 10 seconds
            }
        });

        return () => {
            socket1.disconnect();
        };
    }, [socket1]);

    // method for sending newcode to the server
    const sendCode = (newCode) => {
        setCode(newCode);

        if (socket1) {
            socket1.emit('send_code', { newCode });
        }
    }

    return (
        <div>
            <div>
                <h1>Code Block 1:</h1>
                <h3>Logged on as a: {typeRole}</h3>
                <changePage />
                <Editor
                    lineNumbers='off'
                    height="60vh"
                    theme='vs-dark'
                    // if you change the condition down here, code will be editable
                    options={{ readOnly: (typeRole === 'Mentor' ? true : false) }}
                    defaultLanguage="javascript"
                    value={code}
                    onChange={newCode => sendCode(newCode)}
                />
                {showSmiley && <div className="smiley">😊</div>}
            </div>
        </div>
    );
}

export default CodeBlock1;