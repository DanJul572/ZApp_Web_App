import Box from '@mui/material/Box';
import ContentPaste from '@mui/icons-material/ContentPaste';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import CComponentGroupType from '@/constant/CComponentGroupType';

const Identity = props => {
    const {selected} = props;

    const onCoppy = () => {
        if (!selected && !navigator.clipboard) return;
        navigator.clipboard.writeText(selected.id);
    };

    const validComponent = () => {
        if (!selected) return false;
        if (selected.group.value !== CComponentGroupType.container.value) return false;
        return true;
    };

    return validComponent() ? (
        <>
            <Box paddingX={2} display="flex" justifyContent="space-between">
                <Typography fontSize={12}>{selected.id}</Typography>
                <IconButton sx={{padding: 0}} size="small" onClick={onCoppy}>
                    <ContentPaste fontSize="small" />
                </IconButton>
            </Box>
        </>
    ) : (
        <></>
    );
};

export default Identity;
