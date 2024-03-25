import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import io from 'socket.io-client';


const CodeBlock2 = () => {
    const [code, setCode] = useState(`function countOccurences(str, char) {
        return str.split(char).length - 1;
      }
      countOccurences("test", "t"); // 2`);

    // determines who's watching the page, mentor/student
    const [typeRole, setRole] = useState('Mentor');

    //Sets the smiley for the right solution!!
    // works ONLY on CodeBlock1
    const [showSmiley, setShowSmiley] = useState(false);
    const solution = "HEY!";

    const socket2 = io("https://code-editor24.onrender.com");

    useEffect(() => {
        // reports to the server on page changed
        if (socket2) {
            socket2.emit('page_change2', { currentPage: '/block2' });
        }

        //if there is more than one viewer, they count as students.
        socket2.on('receive_users', ({ numUsers }) => {
            if (numUsers > 1) {
                setRole('Student');
            }
        });

        // code is being broadcasted live from another user
        socket2.on('receive_code2', ({ newCode }) => {
            setCode(newCode);
            // Check if the inserted code is correct
            if (newCode.toString() === solution) {
                setShowSmiley(true);
                setTimeout(() => setShowSmiley(false), 10000); // Hide the smiley after 10 seconds
            }
        });

        return () => {
            socket2.disconnect();
        };
    }, [socket2]);

    // method for sending newcode to the server
    const sendCode = (newCode) => {
        setCode(newCode);

        if (socket2) {
            socket2.emit('send_code2', { newCode });
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
                {showSmiley && <div className="smiley">😊</div>}
            </div>
        </div>
    );
}

export default CodeBlock2;