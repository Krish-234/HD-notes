"use client";
import Image from "next/image";
import React, { useState } from "react";
import NoteSideButton from "./note-side-button";
import { Note, session } from "@/app/types";
import { signOut } from "@/app/utils/helpers";
import { redirect } from "next/navigation";
import CreateNoteModal from "./create-note-modal";
import { useLoading } from "@/app/context/loading-context";
import { Frown } from "lucide-react";

export default function Sidebar({
  notes,
  username,
  email,
}: {
  notes: Note[];
  username: string;
  email: string;
  session: session;
}) {
  const { setLoading } = useLoading();
  const handleSignOut = () => {
    setLoading(true);
    signOut();
    setLoading(false);
    redirect("/sign-in");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full w-full lg:w-80">
      <div className="flex justify-between w-[100%] lg:w-80 lg:flex-col lg:space-y-4 lg:min-h-screen lg:border lg:rounded-xl">
        <div className="flex flex-col justify-start p-5">
          <div className="flex items-center space-x-2 p-4 gap-5 lg:pb-10 w-full">
            <Image src="/logo.svg" alt="logo" width={32} height={32} />
            <h1 className="text-xl lg:text-2xl">Dashboard</h1>
          </div>
          <div className="hidden lg:flex flex-col gap-10">
            <button
              onClick={handleOpenModal}
              className="lg:block hidden px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 w-full transition-all ease-in-out duration-200"
            >
              Create Note
            </button>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Recent Notes</h2>
              {notes.length === 0 && (
                <div className="flex flex-col w-full gap-5 text-center">
                  <div className="text-2xl text-gray-300 mt-28">
                    Nothing to show here
                  </div>{" "}
                  <Frown className="w-10 h-10 text-gray-300 mx-auto" />
                </div>
              )}

              {notes
                .sort((a, b) => {
                  return (
                    new Date(b.editedAt).getTime() -
                    new Date(a.editedAt).getTime()
                  );
                })
                .map((note) => (
                  <NoteSideButton key={note.id} note={note} />
                ))}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 p-4">
          <button
            onClick={handleSignOut}
            className="md:px-4 px-2 py-2 text-sm lg:text-lg text-blue-600 font-semibold underline bg-transparent rounded-md hover:bg-gray-200 transition-all ease-in-out duration-200 lg:w-full lg:bg-blue-600 lg:text-white lg:no-underline lg:hover:bg-blue-800"
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className="flex flex-col  lg:w-80 lg:flex-col lg:space-y-4 shadow-lg px-5 py-10 m-5 gap-4 border rounded-xl lg:hidden">
        <h2 className="lg:text-2xl font-semibold text-xl">
          Welcome, {username} !
        </h2>
        <h3 className="lg:text-lg text-gray-500 text-lg ">Email: {email}</h3>
      </div>
      <div className="flex flex-col p-5 gap-5 lg:hidden">
        <button
          onClick={handleOpenModal}
          className="px-4 py-4 mx-auto text-white bg-blue-600 rounded-md hover:bg-blue-700 w-full transition-all ease-in-out duration-200 "
        >
          Create Note
        </button>
      </div>
      <div className="flex flex-col w-full p-3 items-center gap-5 lg:hidden">
        <h2 className="text-xl font-semibold w-full text-left ml-8">Notes</h2>
        {notes.length === 0 && (
          <div className="text-2xl text-gray-300 mt-40">
            Nothin to show here
          </div>
        )}
        {notes.map((note) => (
          <NoteSideButton key={note.id} note={note} />
        ))}
      </div>
      <CreateNoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={() => {}}
      />
    </div>
  );
}
