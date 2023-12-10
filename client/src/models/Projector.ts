import Two from 'two.js';

import { Path } from 'two.js/src/path';
import { Group } from 'two.js/src/group';
import { Vector } from 'two.js/src/vector';
import { ZUI } from 'two.js/extras/jsm/zui';

export default class Projector {
  internal: Two;
  private readonly stage: Group;
  private zui: ZUI;
  private mouse: Vector;
  private distance = 0;
  private draggingShape = false;
  private readonly dragShapes: Path[];
  private dragging = false;

  constructor(dragShapes?: Path[], options?: any) {
    this.internal = new Two(options);
    this.stage = new Group();

    this.internal.add(this.stage);

    this.zui = new ZUI(this.stage, document.body);
    this.mouse = new Two.Vector();
    this.dragShapes = dragShapes ?? [];

    this.zui.addLimits(0.06, 8);
    this.zui.translateSurface(10, 10);
  }

  appendTo(element: HTMLElement) {
    this.internal.appendTo(element);
  }

  add(shape: Path, draggable?: boolean): Projector {
    if (draggable) this.dragShapes.push(shape);
    this.internal.add(shape);
    return this;
  }

  remove(shape: Path, draggable?: boolean): Projector {
    if (draggable) {
      const index = this.dragShapes.indexOf(shape);

      if (index == -1) {
        console.error('Drag shape was unable to be removed, as it could not be found...');
        return this;
      }

      this.dragShapes.splice(index, 1);
    }
    this.internal.remove(shape);
    return this;
  }

  private mousedown(e: MouseEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;

    for (const shape of this.dragShapes ?? []) {
      const rect = shape.getBoundingClientRect();
      this.draggingShape =
        this.mouse.x > rect.left &&
        this.mouse.x < rect.right &&
        this.mouse.y > rect.top &&
        this.mouse.y < rect.bottom;
    }

    this.dragging = true;
  }

  private mousemove(e: MouseEvent) {
    const dx = e.clientX - this.mouse.x;
    const dy = e.clientY - this.mouse.y;

    if (this.dragging) {
      if (this.draggingShape && this.dragShapes !== null) {
        // TODO: Multi-shape dragging.
        // this.dragShapes.position.x += dx / this.zui.scale;
        // this.dragShapes.position.y += dy / this.zui.scale;
      } else {
        this.zui.translateSurface(dx, dy);
      }
    }

    this.mouse.set(e.clientX, e.clientY);
  }

  private mouseup() {
    this.dragging = false;
  }

  private mousewheel(e: WheelEvent) {
    const dy = -e.deltaY / 1000;
    this.zui.zoomBy(dy, e.clientX, e.clientY);
  }

  private touchstart(e: TouchEvent) {
    switch (e.touches.length) {
      case 2:
        this.pinchstart(e);
        break;
      case 1:
        this.panstart(e);
        break;
    }
  }

  private touchmove(e: TouchEvent) {
    switch (e.touches.length) {
      case 2:
        this.pinchmove(e);
        break;
      case 1:
        this.panmove(e);
        break;
    }
  }

  private touchend(e: TouchEvent) {
    const touch = e.touches[0];
    if (touch) {
      // Pass through for panning after pinching
      this.mouse.x = touch.clientX;
      this.mouse.y = touch.clientY;
    }
  }

  private panstart(e: TouchEvent) {
    const touch = e.touches[0];
    this.mouse.x = touch.clientX;
    this.mouse.y = touch.clientY;
  }

  private panmove(e: TouchEvent) {
    const touch = e.touches[0];
    const dx = touch.clientX - this.mouse.x;
    const dy = touch.clientY - this.mouse.y;
    this.zui.translateSurface(dx, dy);
    this.mouse.set(touch.clientX, touch.clientY);
  }

  private pinchstart(e: TouchEvent) {
    const touchList: Touch[] = [];
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      touchList[touch.identifier] = touch;
    }
    const a = touchList[0];
    const b = touchList[1];
    const dx = b.clientX - a.clientX;
    const dy = b.clientY - a.clientY;
    this.distance = Math.sqrt(dx * dx + dy * dy);
    this.mouse.x = dx / 2 + a.clientX;
    this.mouse.y = dy / 2 + a.clientY;
  }

  private pinchmove(e: TouchEvent) {
    const touchList: Touch[] = [];
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      touchList[touch.identifier] = touch;
    }
    const a = touchList[0];
    const b = touchList[1];
    const dx = b.clientX - a.clientX;
    const dy = b.clientY - a.clientY;
    const d = Math.sqrt(dx * dx + dy * dy);
    const delta = d - this.distance;
    this.zui.zoomBy(delta / 250, this.mouse.x, this.mouse.y);
    this.distance = d;
  }
}
