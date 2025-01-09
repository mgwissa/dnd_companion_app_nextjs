"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function NotesPage() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none focus:outline-none prose-stone min-h-[150px] px-4 py-2",
      },
    },
  });

  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Note Title"
            className="w-full px-4 py-2 text-xl font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
            <EditorContent editor={editor} />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Note
          </button>
        </form>
      </div>
      <h2>Notes</h2>
      <h3>1/8/2025</h3>
      <p>Magical Candies:</p>
      <ul>
        <li>White - Frothing at the mouth</li>
        <li>Yellow - Fireflies (see in the dark)</li>
        <li>Shrink</li>
        <li>Grow</li>
        <li>Become a Butterfly</li>
        <li>Shrug</li>
        <li>Shrug</li>
        <li>Shrug</li>
      </ul>
    </>
  );
}
