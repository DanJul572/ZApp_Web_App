import Button from '@mui/material/Button';
import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const TopBar = () => {
    return (
        <Grid container position="fixed" style={{backgroundColor: 'white'}} zIndex={2} top={0} right={0} left={0}>
            <Grid
                alignItems="center"
                border={1}
                borderColor={grey[400]}
                display="flex"
                item
                justifyContent="space-between"
                padding={2}
                xs={12}>
                <Typography style={{fontWeight: 'bold'}}>VIEW BUILDER</Typography>
                <Button variant="contained" size="small">
                    Save
                </Button>
            </Grid>
        </Grid>
    );
};

export default TopBar;
