import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React from 'react';
import { SERIBII_BASE_URL } from './util';

/**
 * 
 * @returns 
 */
export const VerticalDivider = () => (
    <Divider
        flexItem
        orientation="vertical"
        variant="middle"
        sx={{ marginLeft: 2, marginRight: 2 }}
    />
);

/**
 * 
 * @returns 
 */
export const NoDataText = () => (
    <Typography variant="caption" component="div">
        No data
    </Typography>
);

/**
 * 
 * @param param0 
 * @returns 
 */
export const PokemonAvatar = ({
    name,
    image_src,
}: {
    name: string,
    image_src: string,
}) => (
    <Avatar
        alt={name}
        src={`${SERIBII_BASE_URL}${image_src}`}
    />
);