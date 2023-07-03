"use client"

import React from "react";

type Props = {
    label?: string;
    icon?: any;
    iconAltText?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ label, icon, iconAltText, onClick }: Props) => {
    return (
        <button className="flex justify-center items-center w-32 h-10 sm:w-40 sm:h-16 p-4 bg-sky-800 rounded-md text-white font-bold duration-300 hover:bg-opacity-90" onClick={onClick} >
            {icon &&
                <div className="w-10">
                    <img className="invert brightness-50" src={icon} alt={iconAltText} />
                </div>
            }
            
            {label &&
                <div className="pl-4 text-xl">{label}</div>
            }
        </button>
    );
}