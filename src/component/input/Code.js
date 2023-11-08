import CodeEditor from '@uiw/react-textarea-code-editor';

const Code = props => {
    const {value, onChange} = props;

    return (
        <CodeEditor
            value={value}
            language="js"
            placeholder="Please enter JS code."
            onChange={evn => onChange(evn.target.value)}
            padding={15}
            style={{
                borderRadius: 3,
                fontSize: 12,
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
            data-color-mode="dark"
        />
    );
};

export default Code;
