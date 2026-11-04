import { Component, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-sidebar',
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  protected openMenu = '';

  menuSelected = output<string>();

  protected toggleMenu(menu: string): void {
    if (this.openMenu === menu) {
      this.openMenu = '';
    } else {
      this.openMenu = menu;
    }
  }

  protected selectMenuItem(name: string): void {
    this.menuSelected.emit(name);
  }
}
