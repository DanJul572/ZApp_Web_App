import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';

import DeleteComponent from './Delete';
import Identity from './Identity';
import Position from './Position';

const Properties = props => {
    const {selected, setSelected, setContent, content} = props;

    return (
        <Grid item xs={2} border={1} borderLeft={0} borderColor={grey[400]}>
            <DeleteComponent selected={selected} setContent={setContent} content={content} setSelected={setSelected} />
            <Identity selected={selected} />
            <Position selected={selected} setContent={setContent} content={content} setSelected={setSelected} />
        </Grid>
    );
};

export default Properties;
