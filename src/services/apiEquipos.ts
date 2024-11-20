import api from "@/lib/axios"
import { Equipo } from "@/types/equipos"
import { isAxiosError } from "axios"


export const createEquipos = async (data: Equipo) => {

  try {
    const { data: response } = await api.post('/equipos', data)
    return response
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return error.response.data
    }
  }

}