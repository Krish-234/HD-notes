"use client";
import React, { useState } from "react";

import { Suspense } from "react";
import { LoaderPinwheel, Search } from "lucide-react";
import { Note } from "@/app/types";
import NoteModal from "./note-modal";

export default function NotesDisplay({ notes }: { notes: Note[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = (note: Note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentNote(null);
  };

  const [sortedNotes, setSortedNotes] = useState(notes);
  const sortingOptions = ["Newest", "Oldest", "Alphabetical", "None"];

  const handleSort = (option: string) => {
    if (option === "Newest") {
      setSortedNotes(
        [...sortedNotes].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } else if (option === "Oldest") {
      setSortedNotes(
        [...sortedNotes].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      );
    } else if (option === "Alphabetical") {
      setSortedNotes(
        [...sortedNotes].sort((a, b) => a.title.localeCompare(b.title))
      );
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setSortedNotes(notes);
    } else {
      setSortedNotes(
        notes.filter((note) =>
          note.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="flex flex-col h-[85vh]">
      <div className="flex justify-between items-center px-10 mt-10">
        <h2 className="text-3xl ">Your Notes</h2>
        <div className="flex relative">
          <input
            type="text"
            placeholder="Search Notes"
            value={searchQuery}
            onChange={handleSearch}
            className="p-2 border-2 rounded-md relative w-96"
          />
          <Search className="absolute right-2 top-2 text-gray-300" />
        </div>
        <div className="flex justify-center ">
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="p-2 border-2 rounded-md"
          >
            {sortingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col items-center h-full ">
        {sortedNotes.length === 0 && (
          <>
            <h2 className="text-2xl text-gray-400 mt-20">No Notes Found</h2>
            <h3 className="text-xl text-gray-500 mt-5">So empty... :-(</h3>
          </>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full h-full overflow-auto p-5">
          <Suspense fallback={<LoaderPinwheel />}>
            {sortedNotes.map((note) => (
              <button
                className="w-full my-4 relative border-2 h-40 rounded-lg hover:bg-gray-100 hover:shadow-md hover:scale-105 transition-all ease-in-out duration-200"
                key={note.id}
                onClick={() => openModal(note)}
              >
                <div key={note.id} className="p-4 h-full gap-1">
                  <h3 className="truncate text-xl font-semibold border-b">
                    {note.title}
                  </h3>
                  <p className="text-gray-500 line-clamp-3">{note.content}</p>
                </div>
                <div className="text-xs absolute right-0 bottom-0 text-gray-400 border-l border-t border-r rounded-t-md p-1">
                  Last Edited at:
                  {note.editedAt.toLocaleString()}
                </div>
              </button>
            ))}
          </Suspense>
        </div>
      </div>
      {currentNote && isModalOpen && (
        <NoteModal
          note={currentNote}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
