import {colors, Grid} from '@mui/material';
import DeleteComponent from './delete_component';

const Properties = props => {
    const {selected, setSelected, setContent, content} = props;

    return (
        <Grid item xs={2} border={1} borderLeft={0} borderColor={colors.grey[400]}>
            <DeleteComponent
                selected={selected}
                setContent={setContent}
                content={content}
                setSelected={setSelected}
            />
        </Grid>
    );
};

export default Properties;
