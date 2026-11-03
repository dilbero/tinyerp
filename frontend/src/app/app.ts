import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Navbar } from './layout/navbar/navbar';
import { Sidebar } from './layout/sidebar/sidebar';
import { Workspace } from './layout/workspace/workspace';

@Component({
  imports: [Navbar, Sidebar, Workspace],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('TinyERP');
  protected healthMessage = signal('Verbindung wird geprüft ...');

  protected activePage = signal('Dashboard');
  protected topMenu = signal('');

  constructor(private http: HttpClient) {
    this.http.get('/api/health', { responseType: 'text' }).subscribe({
      next: (message) => this.healthMessage.set(message),
      error: () => this.healthMessage.set('Backend nicht erreichbar'),
    });
  }

  protected navigateTo(page: string): void {
    this.activePage.set(page);
    this.topMenu.set('');
  }

  protected toggleTopMenu(menu: string): void {
    this.topMenu.update(current => current === menu ? '' : menu);
  }
}
