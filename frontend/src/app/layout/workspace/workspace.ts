import { Component, input, signal } from '@angular/core';

interface WorkspaceWindow {
  id: number;
  type: string;
  x: number;
  y: number;
}

@Component({
  imports: [],
  selector: 'app-workspace',
  styleUrl: './workspace.css',
  templateUrl: './workspace.html',
})
export class Workspace {
  protected openWindows = signal<WorkspaceWindow[]>([]);
  protected selectedMenu = input<string | null>(null);
  private nextWindowId = 1;
  private draggedWindowId: number | null = null;
  private lastMouseX = 0;
  private lastMouseY = 0;

  public handleMenuSelection(type: string): void {
    if (type !== 'Dashboard') {
      this.openWindow(type);
    }
  }

  protected openWindow(type: string): void {
    const newWindow: WorkspaceWindow = {
      id: this.nextWindowId++,
      type: type,
      x: 30 + this.openWindows().length * 30,
      y: 30 + this.openWindows().length * 30,
    };

    this.openWindows.update(windows => [...windows, newWindow]);
  }

  protected closeWindow(id: number): void {
    this.openWindows.update(windows =>
      windows.filter(window => window.id !== id)
    );
  }

  protected startDragging(event: MouseEvent, windowId: number): void {
    this.draggedWindowId = windowId;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }

  protected moveWindow(event: MouseEvent): void {
    if (this.draggedWindowId === null) {
      return;
    }

    const deltaX = event.clientX - this.lastMouseX;
    const deltaY = event.clientY - this.lastMouseY;

    this.openWindows.update(windows =>
      windows.map(window =>
        window.id === this.draggedWindowId
          ? {
            ...window,
            x: window.x + deltaX,
            y: window.y + deltaY,
          }
          : window
      )
    );

    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }

  protected stopDragging(): void {
    this.draggedWindowId = null;
  }
}
