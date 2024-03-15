import { InventoryRounded, PersonRounded } from "@mui/icons-material";
import { useState } from "react";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";

interface IListItem {
    children: any
    icon: any
    handleClick: () => void
    selected?: boolean
}

function ListItem({ children, handleClick, icon, selected = false }: IListItem) {

    return (
        <li
            onClick={handleClick}
            className={"flex text-white font-medium transition-color cursor-pointer ease-in duration-300 gap-3 items-center  py-10 lg:px-10 sm:px-4 xs:px-4 "
                + (selected ? "bg-secondary" : "")}>
            <span className={"lg:text-[17px] sm:text-[20px] xs:text-[20px]  transition-color ease-in duration-300 " + (selected ? "!text-primary" : "")}>
                {icon}
            </span>
            <span>
                {children}
            </span>
        </li>
    )
}

export default function DashboardMenu() {

    const responsiveShowMenu = useSelector((state : RootState) => state.GlobalSlice.responsiveMenuShow);

    const [selectedTab, setSelectedTab] = useState<number>(0);

    const handleClick = (num: number) => {
        setSelectedTab(num)
    }

    return (
        <div className={'lg:w-2/12 sm:w-4/12 xs:w-1/2 h-screen transition-all duration-300 ease-out bg-default lg:translate-x-0 sm:-translate-x-full xs:-translate-x-full ' + (responsiveShowMenu ? " sm:!translate-x-0 xs:!translate-x-0" : "")} >
            <ul>
                <ListItem handleClick={() => handleClick(0)} selected={selectedTab == 0} icon={<InventoryRounded />}>
                    Inventory List
                </ListItem>
                <ListItem handleClick={() => handleClick(1)} selected={selectedTab == 1} icon={<PersonOutlineOutlinedIcon />}>
                    Users
                </ListItem>
            </ul>
        </div>
    )
}
