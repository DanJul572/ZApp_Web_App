import {useRouter} from 'next/navigation';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

import styled from '@mui/material/styles/styled';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const TopBar = props => {
    const {content, setContent} = props;

    const {push} = useRouter();
    const theme = useTheme();

    const onDownload = () => {
        const jsonString = JSON.stringify(content, null, 2);
        const blob = new Blob([jsonString], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = 'Views.json';

        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);
    };

    const onUpload = event => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = e => {
                try {
                    const jsonContent = JSON.parse(e.target.result);
                    setContent(jsonContent);
                } catch (error) {
                    console.error('Error parsing JSON file : ', error);
                }
            };
            reader.readAsText(selectedFile);
            event.target.value = null;
        } else {
            console.error('Invalid file type. Please choose a JSON file.');
        }
    };

    return (
        <Grid container position="absolute" zIndex={2} top={0} right={0} left={0}>
            <Grid
                alignItems="center"
                borderBottom={1}
                borderColor={grey[300]}
                display="flex"
                item
                justifyContent="space-between"
                padding={2}
                xs={12}>
                <Box display="flex" alignItems="center" gap={1}>
                    <IconButton size="small" sx={{padding: 0}} onClick={() => push('/view')}>
                        <ArrowBack fontSize="small" sx={{color: theme.palette.text.primary}} />
                    </IconButton>
                    <Typography sx={{fontWeight: 'bold'}}>VIEW BUILDER</Typography>
                </Box>
                <Box display="flex" gap={1}>
                    <Box display="flex" gap={1} borderRight={1} borderColor={grey[300]} paddingRight={1}>
                        <Button component="label" variant="outlined" size="small">
                            Upload
                            <VisuallyHiddenInput type="file" accept=".json" onChange={onUpload} />
                        </Button>
                        <Button variant="outlined" size="small" onClick={onDownload}>
                            Download
                        </Button>
                    </Box>
                    <Box display="flex" gap={1} borderRight={1} borderColor={grey[300]} paddingRight={1}>
                        <Button variant="outlined" size="small">
                            Generate
                        </Button>
                    </Box>
                    <Box display="flex" gap={1}>
                        <Button variant="outlined" size="small">
                            Save As Draft
                        </Button>
                        <Button variant="contained" size="small">
                            Save
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default TopBar;
