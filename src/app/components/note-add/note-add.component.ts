import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../service/note.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-note-add',
  imports: [FormsModule, NzButtonComponent, NzInputDirective, NzFormModule],
  templateUrl: './note-add.component.html',
  styleUrl: './note-add.component.scss',
})
export class NoteAdd {
  title = model<string>('');
  content = model<string>('');

  protected notesService = inject(NoteService);

  addNote() {
    if (this.title()?.trim() && this.content()?.trim()) {
      this.notesService.addNote(this.title(), this.content());
    }
  }

  clearForm() {
    this.title.set('');
    this.content.set('');
  }
}
