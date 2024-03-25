import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import io from 'socket.io-client';
import './codeBlock1.css'

// i added notes in this file but not in the other codeBlocks
// but they are just the same.


const CodeBlock1 = () => {
    // Code Sample for editing
    const [code, setCode] = useState(`function reverseString(str) {
        return str.split("").reverse().join("");
    }`);

    // determines who's watching the page, mentor/student
    const [typeRole, setRole] = useState('Mentor');

    //Sets the smiley for the right solution!!
    // works ONLY on CodeBlock1
    const [showSmiley, setShowSmiley] = useState(false);
    const solution = "HEY!";

    const socket1 = io("https://code-editor24.onrender.com");

    useEffect(() => {
        // reports to the server on page changed
        if (socket1) {
            socket1.emit('page_change', { currentPage: '/block1' });
        }

        //if there is more than one viewer, they count as students.
        socket1.on('receive_users', ({ numUsers }) => {
            if (numUsers > 1) {
                setRole('Student');
            }
        });

        // code is being broadcasted live from another user
        socket1.on('receive_code1', ({ newCode }) => {
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
            socket1.emit('send_code1', { newCode });
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