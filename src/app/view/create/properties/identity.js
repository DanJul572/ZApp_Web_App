import {componentGroupType} from '@/constant';
import {ContentCopy} from '@mui/icons-material';
import {Box, Typography, IconButton, Divider} from '@mui/material';

const Identity = props => {
    const {selected} = props;

    const onCoppy = () => {
        if (!selected && !navigator.clipboard) return;

        navigator.clipboard.writeText(selected.id);
    };

    const validComponent = () => {
        if (!selected) return false;
        if (selected.group.value !== componentGroupType.container.value) return false;
        return true;
    };

    return validComponent() ? (
        <>
            <Box padding={2} display="flex" justifyContent="space-between">
                <Typography fontSize={12} fontWeight="bold">
                    {selected.id}
                </Typography>
                <IconButton style={{padding: 0}} size="small" onClick={onCoppy}>
                    <ContentCopy fontSize="12" />
                </IconButton>
            </Box>
            <Divider />
        </>
    ) : (
        <></>
    );
};

export default Identity;
