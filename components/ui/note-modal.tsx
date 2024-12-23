import { useLoading } from "@/app/context/loading-context";
import { Note } from "@/app/types";
import { deleteNote, editNote } from "@/app/utils/helpers";
import { useState } from "react";

interface NoteModalProps {
  note: Note;
  isOpen: boolean;
  onClose: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ note, isOpen, onClose }) => {
  const [newNote, setNewNote] = useState({
    title: note?.title || "",
    content: note?.content || "",
  });

  const { setLoading } = useLoading();

  const handleEdit = async () => {
    setLoading(true);
    if (newNote.title && newNote.content) {
      const res = await editNote(
        note.id,
        newNote.title,
        newNote.content
      );
      if (res.success) {
        onClose();
        setLoading(false);
        window.location.reload();
      } else {
        setLoading(false);
        alert("Failed to edit note!");
      }
    } else {
      setLoading(false);
      alert("Please fill all fields!");
    }
  }

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteNote(
      note.id
    );
    if (res.success) {
      setLoading(false);
      onClose();
      window.location.reload();
    } else {
      setLoading(false);
      alert("Failed to delete note!");
    }
  }

  if (!isOpen) return null; // Do not render if modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center rounded-xl justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 md:max-w-screen-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <input
            className="text-2xl font-bold w-full focus:outline-none"
            type="text"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 font-bold"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-4">
          <textarea
            value={newNote.content}
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
            className="w-full h-52 p-2 border rounded focus:outline-none resize-none"
          />
          <p className="mt-2 text-sm text-gray-400">
            Last Edited at: {note.editedAt.toLocaleString()}
          </p>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 gap-4 flex justify-end">
        <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-500 text-white rounded hover:bg-neutral-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
