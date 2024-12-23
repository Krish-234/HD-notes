import { useLoading } from "@/app/context/loading-context";
import { Note } from "@/app/types";
import { createNote } from "@/app/utils/helpers";
import React, { useState } from "react";


interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Note) => void;
}

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({ isOpen, onClose, onSave }) => {
  const { setLoading } = useLoading();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!isOpen) return null; // Do not render if modal is closed

  const handleSave = async () => {
    setLoading(true);
    if (title && content) {
      const newNote = {
        title,
        content,
      };
      const res = await createNote(newNote.title, newNote.content);
      if (!res.success) {
        alert("Failed to create note!");
        return;
        }
      setLoading(false);
      onSave(res.note); // Pass the new note to the parent
      window.location.reload();
      onClose(); // Close the modal
    } else {
      setLoading(false);
      alert("Please fill all fields!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/2">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-bold">Create New Note</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 font-bold"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNoteModal;
