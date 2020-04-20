import React from 'react'
import { Tooltip, IconButton } from '@material-ui/core';

export default ({children, tip, onClick, btnClassName, tipClassName}) => (
    <Tooltip title={tip} className={tipClassName}>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
)
