import { GridItemType } from "@/types/GridItemType";
import { GridItem } from "./GridItem";
import { SetStateAction } from "react";

type Props = {
    levelGame: number;
    gridItems: GridItemType[];
    onClick: () => void;
}

export const GridItems = ({ levelGame, gridItems, onClick }: Props) => {
    return (
        <>
            {levelGame <= 2 &&
                <div className={`grid grid-cols-2 gap-4`}>
                    {gridItems.map((item, index) => (
                        <GridItem
                            key={index}
                            item={item}
                            onClick={onClick}
                        />
                    ))}
                </div>
            }

            {levelGame === 3 &&
                <div className={`grid grid-cols-3 gap-4`}>
                    {gridItems.map((item, index) => (
                        <GridItem
                            key={index}
                            item={item}
                            onClick={onClick}
                        />
                    ))}
                </div>
            }

            {levelGame === 4 &&
                <div className={`grid grid-cols-4 gap-4`}>
                    {gridItems.map((item, index) => (
                        <GridItem
                            key={index}
                            item={item}
                            onClick={onClick}
                        />
                    ))}
                </div>
            }

            {levelGame === 5 &&
                <div className={`grid grid-cols-5 gap-4`}>
                    {gridItems.map((item, index) => (
                        <GridItem
                            key={index}
                            item={item}
                            onClick={onClick}
                        />
                    ))}
                </div>
            }

            {levelGame === 6 &&
                <div className={`grid grid-cols-6 gap-4`}>
                    {gridItems.map((item, index) => (
                        <GridItem
                            key={index}
                            item={item}
                            onClick={onClick}
                        />
                    ))}
                </div>
            }
        </>
    );
}