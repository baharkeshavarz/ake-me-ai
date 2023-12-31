"use client";

import { HologramItem } from '@/types';
import React, { Dispatch, SetStateAction } from 'react'
import SpinningLoading from '../shared/loader/SpinningLoading';
import ContextVideoCard from './ContextVideoCard';

type ContextVideoListProps = {
  holograms: HologramItem[],
  setHolograms: Dispatch<SetStateAction<HologramItem[]>>;
  changeHandler: (e: any) => void;
}

const ContextVideoList = ({ holograms, setHolograms, changeHandler }: ContextVideoListProps) => {
  return (
    <div className="light-border flex w-full flex-col items-center justify-center rounded-lg bg-gray-50 p-5">
        <h3 className="text-dark400_light900 text-sm">
          :نوع ویدثوی درخواستی خود را انتخاب نمایید
        </h3>
        {holograms.length ? (
          <ContextVideoCard 
              items={holograms} 
              setHolograms={setHolograms}
              changeHandler={changeHandler}
          />
        ) : (
            <SpinningLoading />
        )}
  </div>
  )
}

export default ContextVideoList
