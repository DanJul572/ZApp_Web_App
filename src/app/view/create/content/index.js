import renderComponent from '@/helper/render_component';
import {colors, Grid} from '@mui/material';

const Content = props => {
    const {content} = props;

    return (
        <Grid item xs={8} border={1} borderColor={colors.grey[400]} padding={1}>
            {content.length > 0 && content.map(component => renderComponent(component))}
        </Grid>
    );
};

export default Content;
