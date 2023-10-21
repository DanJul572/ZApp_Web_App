import {Grid, Typography, colors} from '@mui/material';

const TopBar = () => {
    return (
        <Grid container marginBottom={1}>
            <Grid item xs={12} border={1} borderColor={colors.grey[400]} padding={2}>
                <Typography style={{fontWeight: 'bold'}}>VIEW BUILDER</Typography>
            </Grid>
        </Grid>
    );
};

export default TopBar;
