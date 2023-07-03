"use client"

import { items } from "@/data/items";
import { GridItemType } from "@/types/GridItemType";

type Props = {
    item: GridItemType,
    onClick: () => void
}

export const GridItem = ({ item, onClick }: Props) => {

    return (
        <div onClick={onClick} className="w-[80px] aspect-square transition-all duration-300 ease-in-out">
            {!item.permanentShown && !item.shown &&
                <div className="flex justify-center items-center w-full h-full bg-slate-500 rounded-[15%] cursor-pointer hover:bg-slate-700 hover:brightness-150 group duration-500 hover:animate-bounceMe">
                    <img src="./assets/logo.svg" className="w-4/6 invert opacity-20 group-hover:opacity-40" />
                </div>
            }

            {(item.permanentShown || item.shown) && item.item !== null &&
                <div className={`flex justify-center items-center w-full h-full ${item.permanentShown ? 'bg-sky-500' : 'bg-sky-700'} rounded-3xl cursor-pointer animate-flipCard`}>
                    <svg className="w-3/6 h-3/6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox={items[item.item].viewBoxIcon}>
                        <path d={items[item.item].icon}/>
                    </svg>
                    {/* <img src={items[item.item].icon} className="w-3/6" /> */}
                </div>
            }
        </div>
    );
}