import {useRouter} from 'next/navigation';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

const TopBar = () => {
    const {back} = useRouter();

    const theme = useTheme();

    return (
        <Grid container position="fixed" style={{backgroundColor: 'white'}} zIndex={2} top={0} right={0} left={0}>
            <Grid
                alignItems="center"
                border={1}
                borderColor={grey[300]}
                display="flex"
                item
                justifyContent="space-between"
                padding={2}
                xs={12}>
                <Box display="flex" alignItems="center" gap={1}>
                    <IconButton size="small" sx={{padding: 0}} onClick={back}>
                        <ArrowBack fontSize="small" sx={{color: theme.palette.text.primary}} />
                    </IconButton>
                    <Typography style={{fontWeight: 'bold'}}>VIEW BUILDER</Typography>
                </Box>
                <Button variant="contained" size="small">
                    Save
                </Button>
            </Grid>
        </Grid>
    );
};

export default TopBar;
