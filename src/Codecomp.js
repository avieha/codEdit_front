import { CodeBlock, dracula } from 'react-code-blocks';

export function Codecomp({ code }) {
    const readBool = 'readonly';
    return (
        // <CodeBlock
        //     text={code}
        //     language={'JS'}
        //     showLineNumbers={true}
        //     theme={dracula}
        // />
        <textarea readonly={readBool} id="ta">{code}</textarea>
    )
}