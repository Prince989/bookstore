import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Avatar, ListItemIcon, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { logout } from '../../Services/Authenticate';

export default function ProfileAvatar() {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        logout();
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>

            <button onClick={handleClick} className='flex items-center focus:outline-none'>
                <ExpandMoreRoundedIcon sx={{ color: "white" }} />
                <Avatar alt="Admin">
                    A
                </Avatar>
            </button>
        </>
    )
}
