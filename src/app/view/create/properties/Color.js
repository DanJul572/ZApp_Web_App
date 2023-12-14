import {useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

import grey from '@mui/material/colors/grey';

import CComponentGroupType from '@/constant/CComponentGroupType';
import CContainerType from '@/constant/CContainerType';
import CVisualElement from '@/constant/CVisualElementType';

const Color = props => {
    const {content, selected, editComponent, setContent} = props;

    const theme = useTheme();

    const [active, setActive] = useState(null);

    const colors = [
        {
            label: 'Error',
            value: theme.palette.error.main,
            name: 'error',
        },
        {
            label: 'Success',
            value: theme.palette.success.main,
            name: 'success',
        },
        {
            label: 'Warning',
            value: theme.palette.warning.main,
            name: 'warning',
        },
        {
            label: 'Info',
            value: theme.palette.info.main,
            name: 'info',
        },
        {
            label: 'Secondary',
            value: theme.palette.secondary.main,
            name: 'secondary',
        },
        {
            label: 'Primary',
            value: theme.palette.primary.main,
            name: 'primary',
        },
    ];

    const onApply = color => {
        const newColor = active && active.name === color.name ? null : color;
        let newContent = editComponent('color', newColor, content);
        setContent([...newContent]);
        setActive(newColor);
    };

    const validComponent = () => {
        if (!selected) return false;

        let group = selected.group.value;
        let type = selected.type.value;

        if (group === CComponentGroupType.container.value && type !== CContainerType.collapse.value) return false;
        else if (group === CComponentGroupType.chart.value) return false;
        else if (group === CComponentGroupType.fieldControl.value) return false;
        else if (group === CComponentGroupType.table.value) return false;
        else if (group === CComponentGroupType.visualElement.value && type !== CVisualElement.text.value) return false;

        return true;
    };

    useEffect(() => {
        if (selected) setActive(selected.properties.color || null);
    }, [selected]);

    const component = (color, index) => {
        return (
            <Box
                key={index}
                sx={{
                    borderRadius: '50%',
                    width: 15,
                    height: 15,
                    backgroundColor: color.value,
                    cursor: 'pointer',
                    border: active && color.name === active.name ? 2 : 0,
                    borderColor: grey[300],
                }}
                onClick={() => onApply(color)}
            />
        );
    };

    return validComponent() ? (
        <Box paddingX={2}>
            <Typography fontSize={12}>Color</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} marginTop={1}>
                {colors.map(component)}
            </Box>
        </Box>
    ) : (
        <></>
    );
};

export default Color;
