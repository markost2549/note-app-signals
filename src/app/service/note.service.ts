import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Note } from '../model/note';
import { DEMO_NOTES } from '../notes';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  // Internal signal to hold the list of notes
  private _notesSignal: WritableSignal<Note[]> = signal<Note[]>(DEMO_NOTES);

  // Signal to hold the current filter string
  public filter = signal<string>('');

  // Expose notesCount as a read-only signal for components
  public readonly notesCount: Signal<number> = computed(() => this._notesSignal().length);

  // Expose filteredNotes as a read-only signal for components
  public readonly filteredNotes: Signal<Note[]> = computed(() => {
    const filter = this.filter().toLowerCase();
    if (!filter) {
      return this._notesSignal();
    }
    return this._notesSignal().filter(
      (note) =>
        note.title.toLowerCase().includes(filter) || note.content.toLowerCase().includes(filter)
    );
  });

  // Effect to synchronize notes with local storage
  private syncStorageEffect = effect(() => {
    // Save the current notes to local storage whenever they change
    const notes = this._notesSignal();
    console.log('Sync local storage');
    localStorage.setItem('notes', JSON.stringify(notes));
  });

  constructor() {
    this.loadNotesFromStorage();
  }

  // Load notes from local storage if available
  private loadNotesFromStorage(): void {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      this._notesSignal.set(JSON.parse(storedNotes));
    }
  }

  // Method to add a new note
  addNote(title: string, content: string): void {
    const newNote: Note = {
      id: Date.now(), // Simple unique ID
      title,
      content,
      createdAt: new Date(),
    };
    // Use .update() to safely change the signal value based on the current one
    this._notesSignal.update((currentNotes) => [...currentNotes, newNote]);
  }

  // Method to delete a note
  deleteNote(id: number): void {
    this._notesSignal.update((currentNotes) => currentNotes.filter((note) => note.id !== id));
  }
}
