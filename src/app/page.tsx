"use client"

import { useEffect, useState } from "react";

import { GridItemType } from "@/types/GridItemType";
import { items } from "@/data/items";

import { Button } from "@/components/Button";
import { InfoItem } from "@/components/InfoItem";
import { GridItem } from "@/components/GridItem";
import { formatTimeElapsed } from "@/helpers/formatTimeElapsed";

const Page = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);
  const [levelGame, setLevelGame] = useState<number>(1);
  const [changeLevel, setChangeLevel] = useState<boolean>(false);
  const [victory, setVictory] = useState<boolean>(false);
  const [checkAnimation, setCheckAnimation] = useState<boolean>(true);
  const maxLevelGame = items[items.length - 1].level;

  useEffect(() => {
    if (playing) {
      resetAndCreateGrid();
    }
  }, [levelGame]);

  useEffect(() => {
    if (changeLevel) {
      // setTimeout(() => {
        setChangeLevel(false);
      // }, 1000);
    }
  }, [changeLevel]);

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  // verify if opened are equal
  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter(item => item.shown === true);
      if (opened.length === 2) {

        if (opened[0].item === opened[1].item) {
          
          let tempGrid = [...gridItems];
          // if both are equal, make every "shown" permanent
          for(let item of tempGrid) {
            if (item.shown) {
              item.permanentShown = true;
              item.shown = false; 
            }
          }
          setGridItems(tempGrid);
          setShownCount(0);
        } else {
          // if they are NOT equal, close all "shown"
          setTimeout(() => {
            let tempGrid = [...gridItems];
            for (let item of tempGrid) {
              item.shown = false;
            }
            setGridItems(tempGrid);
            setShownCount(0);
          }, 1000);
        }

        setMoveCount(moveCount => moveCount + 1);
      }
    }
  }, [shownCount, gridItems]);

  // verify is game is over
  useEffect(() => {
    if (moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
      setLevelGame(levelGame + 1);
      if ((levelGame + 1) <= maxLevelGame) {
        setChangeLevel(true);
      } else if ((levelGame + 1) === maxLevelGame) {
        setVictory(true);
      }
    }
  }, [moveCount]);
  
  // Start game and advanced level
  const resetAndCreateGrid = (userClick?: boolean) => {
    if (levelGame === 1 || userClick) {
      setChangeLevel(true);
      setTimeElapsed(0);
      setMoveCount(0);
      setShownCount(0);
      setLevelGame(6);
    }

    if (levelGame <= 6) {
      let lengthGrid = items.filter(item => item.level <= levelGame).length;
      let tempGrid: GridItemType[] = [];
      for (let i = 0; i < (lengthGrid * 2); i++) {
        tempGrid.push({
          item: null,
          shown: false,
          permanentShown: false
        });
      }

      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < lengthGrid; j++) {
          let pos = -1;
          while (pos < 0 || tempGrid[pos].item !== null) {
            pos = Math.floor(Math.random() * (lengthGrid * 2));
          }
          tempGrid[pos].item = j;
        }
      }

      setGridItems(tempGrid);
      setPlaying(true);
    } else {
      setPlaying(false);
      setLevelGame(1);
    }
  }

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tempGrid = [...gridItems];

      if (tempGrid[index].permanentShown === false && tempGrid[index].shown === false) {
        tempGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }

      setGridItems(tempGrid);
    }
  }

  const handleCheckAnimation = () => {
    setCheckAnimation(!checkAnimation);
  }

  const setGridColumns = () => {
    // 320px to 640px
    if (levelGame === 1) {
      return "grid-cols-2";
    } else if (levelGame <= 6) {
      return "grid-cols-4";
    }
  }

  return (
    <>
    {victory &&
      <>
        <p className="absolute top-1/2 left-1/2 -mt-8 -ml-16 w-40 h-10 text-4xl text-white font-bold text-center opacity-0 animate-disappear z-10">Parabéns você finalizou o jogo!</p>
        <div className="absolute w-screen h-[50vh] top-0 bg-gray-900 bg-opacity-70 animate-slideIn"></div>
        <div className="absolute w-screen h-[50vh] bottom-0 bg-gray-900 bg-opacity-70 animate-slideIn"></div>
      </>
    }

    <div className="flex flex-col justify-center items-center w-screen h-screen max-w-7xl mx-auto p-1 md:flex-row md:p-5">

      {!changeLevel &&
      <>
        <div className="flex flex-row-reverse justify-between items-center gap-1 flex-wrap w-full px-1 md:w-44 md:h-full md:flex-col md:justify-between md:items-start">
          <a href="#">
              <p className="w-9 text-xs font-['Press_Start_2P'] animate-typing overflow-hidden whitespace-nowrap md:w-[60px] md:text-xl">Dev</p>
              <p className="w-[74px] text-xs font-['Press_Start_2P'] animate-typingEnd overflow-hidden whitespace-nowrap border-r-2 md:w-[120px] md:text-xl">Memory</p>
            {/* <img src="./assets/logo.svg" alt="Imagem do logotipo." className="fill-blue-500 w-36" /> */}
          </a>

          <div className="flex justify-between w-full md:flex-col md:flex-1 md:justify-around md:items-start md:max-h-[50%]">
            <label className="relative flex flex-col justify-around items-center cursor-pointer px-2 md:px-0">
              <span className="md:mb-2 text-xs font-medium text-sky-600 md:text-base">Animação?</span>
              <input type="checkbox" checked={checkAnimation} onClick={handleCheckAnimation} className="sr-only peer" />
              <div className="w-12 h-6 sm:w-14 sm:h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[16px] md:after:top-[32px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 md:after:h-7 md:after:w-7 after:transition-all peer-checked:bg-sky-800"></div>
            </label>
              {/* <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={checkAnimation} onClick={handleCheckAnimation} className="sr-only peer" />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-sky-800"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Animação?</span> 
              <label/>*/}

            <InfoItem label="Level" value={levelGame.toString()} />
            <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)}/>
            <InfoItem label="Tentativas" value={moveCount.toString()}/>
          </div>

          <div className="order-first md:-order-none">
            {playing && 
              <Button label="Reiniciar" icon="./assets/repeat.png" onClick={() => {resetAndCreateGrid(true)}} />
            }
            {!playing &&
              <Button label="Iniciar" icon="./assets/play.png" onClick={() => {resetAndCreateGrid(true)}} />
            }
          </div>
        
        </div>
      
      <div className="flex-1 w-full h-full flex justify-center items-start sm:px-4 overflow-hidden">
        <div className="flex justify-center items-center">
          {playing &&
              // <div className={`grid ${levelGame <= 2 ? 'grid-cols-2' : levelGame === 3 ? 'grid-cols-3' : levelGame === 4 ? 'grid-cols-4' : levelGame === 5 ? 'grid-cols-5' : 'grid-cols-6'} gap-4 p-10 rounded-xl ${checkAnimation ? 'animate-gridEffectIn' : ''} shadow-2xl`}>
              <div className={`grid ${levelGame === 1 ? 'grid-cols-2' : 'grid-cols-4'} gap-2 justify-center justify-items-center items-center min-w-[310px] max-w-md sm:max-w-xl md:max-w-[600px] lg:max-w-[800px] mt-5 rounded-xl ${checkAnimation ? 'animate-gridEffectIn' : ''} shadow-2xl`}>
                {gridItems.map((item, index) => (
                  <GridItem 
                    key={index}
                    item={item}
                    onClick={() => handleItemClick(index)}
                  />
                ))}
              </div>  
            }
        </div>
      </div>
      </>
      }

    </div>
    </>
  );
}

export default Page;