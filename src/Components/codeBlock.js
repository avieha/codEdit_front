import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import io from 'socket.io-client';
import './codeBlock.css'

// this is a generic codeBlock component and is used for each 
// page with different props


const CodeBlock = ({ initialCode, title }) => {

    const blockNum = title.substring(6);
    // let clientId = localStorage.getItem('clientId');

    // Code Sample for editing
    const [code, setCode] = useState(initialCode);

    // determines who's watching the page, mentor/student
    const [typeRole, setRole] = useState('Mentor');
    // const [typeRole, setRole] = useState('Student');

    // Sets the smiley for the right solution!!
    const [showSmiley, setShowSmiley] = useState(false);
    const solution = "HEY!";

    // https://code-editor24.onrender.com
    // http://localhost:10000
    const socket = io("https://code-editor24.onrender.com");

    useEffect(() => {
        // code is being broadcasted live from another user
        socket.on(`receive_code${blockNum}`, ({ newCode }) => {
            setCode(newCode);

            // Check if the inserted code is correct
            if (newCode.toString() === solution) {
                setShowSmiley(true);
                setTimeout(() => setShowSmiley(false), 10000); // Hide the smiley after 10 seconds
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [socket, blockNum]);

    useEffect(() => {
        // If the unique identifier doesn't exist, generate a new one
        let clientId = localStorage.getItem('clientId') || generateUniqueId();
        localStorage.setItem('clientId', clientId);

        // reports to the server the current page number at initial render
        if (socket) {
            socket.emit('page_change', { currentPage: title, userId: clientId });
        }

        // if there is more than one viewer, they count as students.
        socket.on('receive_users', ({ count }) => {
            if (count > 1) {
                setRole('Student');
            }
        });
    }, []);

    // function to generate a unique ID
    const generateUniqueId = () => {
        const randomString = Math.random().toString(36).substring(2, 10);
        const timestamp = new Date().getTime().toString(36);
        const uniqueId = randomString + timestamp;
        return uniqueId;
    }

    // method for sending new code to the server
    const sendCode = (newCode) => {
        setCode(newCode);

        if (socket) {
            socket.emit(`send_code${blockNum}`, { newCode });
        }
    }

    return (
        <div>
            <div>
                <h1>Code Block {blockNum}:</h1>
                <h3>Logged on as a: {typeRole}</h3>
                <Editor
                    height="60vh"
                    theme='vs-dark'
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

export default CodeBlock;