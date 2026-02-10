import css from "./NoteList.module.css";
import type { Note } from "@/types/note";
import { deleteNote } from "@/lib/api/deleteNote";
import { fetchNotes } from "@/lib/api/fetchNotes";
import {
  useMutation,
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NotesClient from "@/app/notes/Notes.client";

// import Link from "next/link";

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

// interface NoteListProps {
//   notes: Note[];
// }

// export default function NoteList({ notes }: NoteListProps) {
//   const queryClient = useQueryClient();

//   const { mutate } = useMutation({
//     mutationFn: deleteNote,
//     onSuccess() {
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//     },
//     onError(error) {
//       console.log(error);
//     },
//   });
//   return (
//     <ul className={css.list}>
//       {notes.map((note) => (
//         <li key={note.id} className={css.listItem}>
//           <h2 className={css.title}>{note.title}</h2>
//           <p className={css.content}>{note.content}</p>
//           <div className={css.footer}>
//             <span className={css.tag}>{note.tag}</span>
//             <Link href="/notes/[id]">View details</Link>

//             <button className={css.button} onClick={() => mutate(note.id)}>
//               Delete
//             </button>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }
