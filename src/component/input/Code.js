import CodeEditor from '@uiw/react-textarea-code-editor';

const Code = props => {
    const {value, onChange, disabled, lang} = props;

    return (
        <CodeEditor
            data-color-mode="dark"
            disabled={disabled}
            language={lang}
            onChange={evn => onChange(evn.target.value)}
            padding={15}
            placeholder="Enter code."
            sx={{
                borderRadius: 3,
                fontSize: 12,
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
            value={value}
        />
    );
};

export default Code;
