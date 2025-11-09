import { Component } from '@angular/core';
import { NoteList } from './components/note-list/note-list.component';
import { NoteAdd } from './components/note-add/note-add.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-root',
  imports: [NoteList, NoteAdd, NzCardModule, NzGridModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
