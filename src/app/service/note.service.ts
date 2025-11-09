import { Injectable, signal } from '@angular/core';
import { Note } from '../model/note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  // Writable signal for the list of notes
  private notes = signal<Note[]>([]);

  // Expose notes as a read-only signal
  protected readonly allNotes = this.notes.asReadonly();

  // Method to add a new note
  addNote(title: string, content: string): void {
    const newNote: Note = {
      id: Date.now(), // Simple unique ID
      title,
      content,
      createdAt: new Date(),
    };
    // Use .update() to safely change the signal value based on the current one
    this.notes.update((currentNotes) => [...currentNotes, newNote]);
  }

  // Method to delete a note
  deleteNote(id: number): void {
    this.notes.update((currentNotes) => currentNotes.filter((note) => note.id !== id));
  }
}
