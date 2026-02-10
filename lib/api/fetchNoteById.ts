import axios from "axios";
import type { Note } from "@/types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNoteById = async (id: Note["id"], page: number = 1) => {
  const { data } = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
    params: {
      page,
      perPage: 12,
    },
  });
  return data;
};
