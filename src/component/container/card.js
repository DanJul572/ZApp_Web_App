import {CardContent} from '@mui/material';
import {Card as Cards} from '@mui/material';

const Card = ({children}) => {
    return (
        <Cards variant="outlined">
            <CardContent>{children}</CardContent>
        </Cards>
    );
};

export default Card;
