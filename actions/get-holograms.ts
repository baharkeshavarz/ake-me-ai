import { HologramItem } from "@/types";
import { getHolograms } from "@/queries/Holograms";

const getAllHolograms =  async() => {
  return (await getHolograms().then(
    (result) => result.data
  )) as HologramItem[];
};


export default getAllHolograms;