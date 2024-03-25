import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import io from 'socket.io-client';


const CodeBlock4 = () => {
    const [code, setCode] = useState(`function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      randomBetween(1,5);`);

    // determines who's watching the page, mentor/student
    const [typeRole, setRole] = useState('Mentor');

    //Sets the smiley for the right solution!!
    // works ONLY on CodeBlock1
    const [showSmiley, setShowSmiley] = useState(false);
    const solution = "HEY!";

    const socket4 = io("https://code-editor24.onrender.com");

    useEffect(() => {
        // reports to the server on page changed
        if (socket4) {
            socket4.emit('page_change4', { currentPage: '/block4' });
        }

        //if there is more than one viewer, they count as students.
        socket4.on('receive_users', ({ numUsers }) => {
            if (numUsers > 1) {
                setRole('Student');
            }
        });

        // code is being broadcasted live from another user
        socket4.on('receive_code4', ({ newCode }) => {
            setCode(newCode);
            // Check if the inserted code is correct
            if (newCode.toString() === solution) {
                setShowSmiley(true);
                setTimeout(() => setShowSmiley(false), 10000); // Hide the smiley after 10 seconds
            }
        });

        return () => {
            socket4.disconnect();
        };
    }, [socket4]);

    // method for sending newcode to the server
    const sendCode = (newCode) => {
        setCode(newCode);

        if (socket4) {
            socket4.emit('send_code4', { newCode });
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
                {showSmiley && <div className="smiley">😊</div>}
            </div>
        </div>
    );
}

export default CodeBlock4;