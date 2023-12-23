import { HologramItem } from "@/types";
import { defaultApiHandler } from "../lib/handleApiError";
import { getHolograms } from "@/queries/Holograms";

const getAllHolograms =  async() => {
  return (await getHolograms().then(defaultApiHandler).then(
    (result) => result
  )) as HologramItem[];
};


export default getAllHolograms;