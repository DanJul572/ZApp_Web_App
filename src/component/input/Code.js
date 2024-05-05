import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CodeEditor from '@uiw/react-textarea-code-editor';

import CTheme from '@/constant/CTheme';

const Code = props => {
    const {label, value, onChange, disabled, lang} = props;

    return (
        <Box>
            <Typography fontSize={CTheme.font.size.value}>{label}</Typography>
            <CodeEditor
                data-color-mode="dark"
                disabled={disabled}
                language={lang}
                onChange={evn => onChange(evn.target.value)}
                padding={15}
                placeholder="Write here..."
                style={{
                    borderRadius: 3,
                    fontSize: 12,
                    fontFamily: 'Consolas',
                }}
                value={value}
            />
        </Box>
    );
};

export default Code;
