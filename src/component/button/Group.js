import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Group = props => {
    const {items, size, variant, onClick, color} = props;

    const handleClick = item => {
        if (onClick) {
            onClick(item);
        }
    };

    return (
        <ButtonGroup variant={variant || 'contained'}>
            {items &&
                items.length > 0 &&
                items.map((item, index) => {
                    return (
                        <Button
                            color={color || 'primary'}
                            key={index}
                            size={size || 'small'}
                            onClick={() => handleClick(item)}>
                            {item.label}
                        </Button>
                    );
                })}
        </ButtonGroup>
    );
};

export default Group;
