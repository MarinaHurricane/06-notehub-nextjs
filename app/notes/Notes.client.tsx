"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/fetchNotes";
import css from "./notes.module.css";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/deleteNote";
import { useQueryClient } from "@tanstack/react-query";
import Pagination from "@/components/Pagination/Pagination";
import { useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebounce, useDebouncedCallback } from "use-debounce";

export default function NotesClient() {
    const [page,setPage] = useState(1);
    const[query, setQuery] = useState('');
    const[isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

  const { data } = useQuery({
    queryKey: ["notes", page, query],
    queryFn: () => fetchNotes(page, query),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

     const handleSearch = (newQuery: string) => {
        setQuery(newQuery);
        setPage(1);
    };


    const debouncedSetQuery = useDebouncedCallback(handleSearch, 500);


  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <div className={css.notesContainer}>
    <div className={css.toolbar}>
    <SearchBox onSearch={debouncedSetQuery}/>
         {totalPages > 1 && <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />}
            <button className={css.createButton} onClick={handleOpenModal}>
          Create note +
        </button>
        </div>
        {isModalOpen && <Modal onClose={handleCloseModal}>
            <NoteForm onClose={handleCloseModal}/>
        </Modal> }
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}>View details</Link>

            <button className={css.button} onClick={() => mutate(note.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  
    </div>
  );
}
