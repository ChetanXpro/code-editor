import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { ACTIONS } from '../action';

const Editor = ({ socketRef, roomId, onCodeChange }: any) => {
    const editorRef = useRef(null) as any
    useEffect(() => {
        async function init() {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('editor') as any,
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on('change', (instance: any, changes: any) => {

                const code = instance.getValue()

                onCodeChange(code)
                const { origin } = changes;

                if (origin !== 'setValue') {
                    socketRef.current.emit('code_change', {
                        roomId,
                        code,
                    });
                    console.log('emit', code)
                }
            });


        }
        init()
    }, []);



    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('code_change', ({ code }: any) => {
                if (code !== null) {
                    console.log('Rec', code)
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        };
    }, [socketRef.current]);


    return (
        <textarea name="" id="editor" ></textarea>
    )
}

export default Editor