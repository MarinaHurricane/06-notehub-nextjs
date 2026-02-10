import axios from "axios";
import type { Note } from "@/types/note";

type NoteId = Note["id"];

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const deleteNote = async(id: NoteId) => {
  const { data } = await axios.delete<Note>(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${myKey}`
      },
  });
  return data;
}
