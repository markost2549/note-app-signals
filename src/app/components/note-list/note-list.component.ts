import { Component, inject } from '@angular/core';
import { NoteService } from '../../service/note.service';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-note-list',
  imports: [NzButtonModule, NzListModule, NzInputDirective],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
})
export class NoteList {
  noteService = inject(NoteService);

  onFilterChanged(filterText: Event): void {
    const input = filterText.target as HTMLInputElement;
    const value = input.value;
    this.noteService.filter.set(value);
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id);
  }
}
