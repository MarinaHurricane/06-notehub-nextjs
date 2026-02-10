import axios from "axios";
import type { Note } from "@/types/note";

export interface createNoteProps {
  content: string;
  tag: string;
  title: string;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const createNote = async( { content, tag, title }: createNoteProps) => {
  const { data } = await axios.post<Note>("/notes", { content, tag, title }, {
      headers: {
        Authorization: `Bearer ${myKey}`
      },
  });
  return data;
}