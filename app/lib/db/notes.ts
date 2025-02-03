import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { User } from "firebase/auth";

export interface Note {
  id?: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const COLLECTION = "notes";

export async function createNote(
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
) {
  return addDoc(collection(db, COLLECTION), {
    ...note,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export async function getNotes(userId: string) {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() } as Note))
    .filter((note) => note.userId === userId);
}

export async function updateNote(id: string, data: Partial<Note>) {
  const docRef = doc(db, COLLECTION, id);
  return updateDoc(docRef, {
    ...data,
    updatedAt: new Date(),
  });
}

export async function deleteNote(id: string) {
  const docRef = doc(db, COLLECTION, id);
  return deleteDoc(docRef);
}
