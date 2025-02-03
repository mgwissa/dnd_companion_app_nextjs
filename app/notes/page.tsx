"use client";

import { useState, useEffect } from "react";
import RichTextEditor from "../components/RichTextEditor";
import { createNote, getNotes, Note } from "@/lib/db/notes";
import { useAuth } from "@/lib/auth"; // Assuming you have auth set up

export default function NotesPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadNotes();
    }
  }, [user]);

  const loadNotes = async () => {
    if (!user) return;
    const userNotes = await getNotes(user.uid);
    setNotes(userNotes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await createNote({
      title,
      content,
      userId: user.uid,
    });

    // Reset form and reload notes
    setTitle("");
    setContent("");
    loadNotes();
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 text-xl font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <RichTextEditor initialContent={content} onChange={setContent} />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Note
          </button>
        </form>

        <div className="mt-8 space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: note.content }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

{
  /* <ul>
<li>White - Frothing at the mouth</li>
<li>Yellow - Fireflies (see in the dark)</li>
<li>Shrink</li>
<li>Grow</li>
<li>Become a Butterfly</li>
<li>Orange - Head swells to double it's size</li>
<li>Fingers leave stains on anything they touch</li>
<li>whenever you step, you make music that anyone within 30 feet can hear</li> */
}
