import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const TopBar = () => {
    return (
        <Grid container marginBottom={1}>
            <Grid item xs={12} border={1} borderColor={grey[400]} padding={2}>
                <Typography style={{fontWeight: 'bold'}}>VIEW BUILDER</Typography>
            </Grid>
        </Grid>
    );
};

export default TopBar;
