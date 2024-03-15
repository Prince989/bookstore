import { IconButton } from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setResponsiveMenuShow } from '../../lib/features/global';
import { RootState } from '../../lib/store';
import ProfileAvatar from '../ProfileAvatar';

export default function Header() {

    const dispatch = useDispatch();

    const menuShow = useSelector((state: RootState) => state.GlobalSlice.responsiveMenuShow);

    const toggleMenu = () => {
        dispatch(setResponsiveMenuShow(!menuShow));
    }

    return (
        <div className='bg-default shadow-xl flex justify-between h-24 w-full lg:px-10 sm:px-4 xs:px-4 py-3'>
            <div className='lg:hidden sm:flex xs:flex justify-center items-center h-full'>
                <IconButton onClick={toggleMenu}>
                    <MenuRoundedIcon sx={{ color: "white", fontSize: "35px" }} />
                </IconButton>
            </div>
            <div className='flex gap-2 items-center'>
                <a href="/" className='focus:outline-none'>
                    <img src="/logo.png" className='w-14 h-14 object-contain' />
                </a>
                <span className='text-white font-medium'>
                </span>
                <span className='text-primary lg:block sm:hidden xs:hidden font-extralight font-sans text-2xl'>
                    BookStore
                </span>
            </div>
            <ProfileAvatar />
        </div>
    )
}
