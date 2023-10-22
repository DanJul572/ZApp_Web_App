import {colors, Grid} from '@mui/material';
import Delete from './delete';
import Position from './position';

const Properties = props => {
    const {selected, setSelected, setContent, content} = props;

    return (
        <Grid item xs={2} border={1} borderLeft={0} borderColor={colors.grey[400]}>
            <Delete
                selected={selected}
                setContent={setContent}
                content={content}
                setSelected={setSelected}
            />
            <Position
                selected={selected}
                setContent={setContent}
                content={content}
                setSelected={setSelected}
            />
        </Grid>
    );
};

export default Properties;
