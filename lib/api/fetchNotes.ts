import axios from "axios";
import type { Note } from "@/types/note";

interface fetchNotesResponseProps {
  notes: Note [];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async(page: number = 1, searchText: string = "") => {
    const { data } = await axios.get<fetchNotesResponseProps>("/notes", {
        headers: {
        Authorization: `Bearer ${myKey}`
      },
      params: {
        page, 
        perPage: 12,
        search: searchText,
      }
    });
    return data;
};