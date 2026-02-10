import css from "./NoteList.module.css";
import { fetchNotes } from  "@/lib/api";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NotesClient from "@/app/notes/Notes.client";


export default async function Notelist() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    </>
  );
}


