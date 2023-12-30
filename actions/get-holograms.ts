import { HologramItem } from "@/types";
import { downloadHologramByName, getHolograms, uploadHologram } from "@/queries/Holograms";

export const getAllHolograms =  async() => {
  return (await getHolograms().then(
    (result) => result.data
  )) as HologramItem[];
};

export const getHologramVideo = async(name: string) => {
  return (await downloadHologramByName(name).then(
    (result) => result
  ));
};

export const uploadHologramVideo = async(file: any) => {
  return (await uploadHologram(file).then(
    (result) => result
  ));
};


