"use client";

import { HologramItem } from '@/types';
import React, { Dispatch, SetStateAction } from 'react'
import SpinningLoading from '../shared/loader/SpinningLoading';
import ContextVideoCard from './ContextVideoCard';

type ContextVideoListProps = {
  holograms: HologramItem[],
  setHolograms: Dispatch<SetStateAction<HologramItem[]>>;
  changeHandler: (e: any) => void;
  card: string;
}

const ContextVideoList = ({ holograms, setHolograms, changeHandler, card }: ContextVideoListProps) => {
  return (
    <div className="light-border flex w-full flex-col items-center justify-center rounded-lg bg-gray-50 p-5">
        <h3 className="text-dark400_light900 small-semibold pb-2">
          :نوع ویدثوی درخواستی خود را انتخاب نمایید
        </h3>
        {holograms.length ? (
          <ContextVideoCard 
              items={holograms} 
              setHolograms={setHolograms}
              changeHandler={changeHandler}
              card={card}
          />
        ) : (
            <SpinningLoading />
        )}
  </div>
  )
}

export default ContextVideoList
