import { OverlayProcess } from './process';
import find from 'find-process';
import EventEmitter from 'node:events';
import { promises as wql } from '@jellybrick/wql-process-monitor';

type ManagerEventEmitter = EventEmitter<{
  added: [pid: number, overlay: OverlayProcess],
  removed: [pid: number],
}>;

export class OverlayManager {
  readonly event: ManagerEventEmitter = new EventEmitter();

  private readonly map: Map<number, OverlayProcess> = new Map();
  private readonly abortController: AbortController = new AbortController();

  private async addOverlay(pid: number) {
    try {
      console.debug('initializing ingame overlay pid:', pid);
      const overlay = await OverlayProcess.initialize(pid);
      try {
        await overlay.window.loadURL('http://localhost:24050/api/ingame');
      } catch (e) {
        console.warn('cannot connect to ingame overlay. err: ', e);
      }

      this.map.set(pid, overlay);
      this.event.emit('added', pid, overlay);
      overlay.event.once('destroyed', () => {
        this.map.delete(pid);
        this.event.emit('removed', pid);
      });
    } catch (e) {
      console.warn('overlay injection failed err:', e);
    }
  }

  async run() {
    const signal = this.abortController.signal;

    const emitter = await wql.subscribe({
      creation: true,
    });
    emitter.on('creation', ([name, pid]) => {
      if (name === 'osu!.exe') {
        const id = Number.parseInt(pid);
        if (isNaN(id)) {
          return;
        }

        void this.addOverlay(id);
      }
    });

    const procList = await find('name', 'osu!.exe');
    for (const proc of procList) {
      const pid = proc.pid;
      await this.addOverlay(pid);
    }

    await new Promise((resolve) => {
      signal.addEventListener('abort', resolve, { once: true });
    });
  }

  reloadAll() {
    for (const overlay of this.map.values()) {
      overlay.window.reload();
    }
  }

  destroy() {
    this.abortController.abort();
  }
}

// fix wql
// eslint-disable-next-line @typescript-eslint/no-deprecated
void wql.createEventSink();
