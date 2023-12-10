import Two from 'two.js';

import { ZUI } from 'two.js/extras/jsm/zui';
import { Path } from 'two.js/src/path';
import type { Group } from 'two.js/src/group';
import type { Vector } from 'two.js/src/vector';

export default class ZUIfy {
  private domElement: HTMLElement;
  private zui: ZUI;
  mouse: Vector;
  distance = 0;
  dragging = false;
  dragShapes: Path[];

  constructor(two: Two, stage: Group, dragShapes: Path[]) {
    this.domElement = two.renderer.domElement;
    // this.zui = new ZUI(stage);
    this.mouse = new Two.Vector();
    this.dragShapes = dragShapes;

    this.zui.addLimits(0.06, 8);

    this.domElement.addEventListener('mousedown', this.mousedown, false);
    this.domElement.addEventListener('mousewheel', this.mousewheel, false);
    this.domElement.addEventListener('wheel', this.mousewheel, false);

    this.domElement.addEventListener('touchstart', this.touchstart, false);
    this.domElement.addEventListener('touchmove', this.touchmove, false);
    this.domElement.addEventListener('touchend', this.touchend, false);
    this.domElement.addEventListener('touchcancel', this.touchend, false);
  }

  mousedown(e: MouseEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;

    //TODO: Implement logic for dragging multiple different shapes
    if (this.dragShapes !== null) {
      const rect = this.dragShapes.getBoundingClientRect();
      this.dragging =
        this.mouse.x > rect.left &&
        this.mouse.x < rect.right &&
        this.mouse.y > rect.top &&
        this.mouse.y < rect.bottom;
    }

    window.addEventListener('mousemove', this.mousemove, false);
    window.addEventListener('mouseup', this.mouseup, false);
  }

  mousemove(e: MouseEvent) {
    const dx = e.clientX - this.mouse.x;
    const dy = e.clientY - this.mouse.y;
    if (this.dragging && this.dragShapes !== null) {
      this.dragShapes.position.x += dx / this.zui.scale;
      this.dragShapes.position.y += dy / this.zui.scale;
    } else {
      this.zui.translateSurface(dx, dy);
    }
    this.mouse.set(e.clientX, e.clientY);
  }

  mouseup() {
    window.removeEventListener('mousemove', this.mousemove, false);
    window.removeEventListener('mouseup', this.mouseup, false);
  }

  mousewheel(e: WheelEvent) {
    const dy = -e.deltaY / 1000;
    this.zui.zoomBy(dy, e.clientX, e.clientY);
  }

  touchstart(e: TouchEvent) {
    switch (e.touches.length) {
      case 2:
        pinchstart(e);
        break;
      case 1:
        panstart(e);
        break;
    }
  }

  touchmove(e: TouchEvent) {
    switch (e.touches.length) {
      case 2:
        pinchmove(e);
        break;
      case 1:
        panmove(e);
        break;
    }
  }

  touchend(e: TouchEvent) {
    const touch = e.touches[0];
    if (touch) {
      // Pass through for panning after pinching
      this.mouse.x = touch.clientX;
      this.mouse.y = touch.clientY;
    }
  }

  panstart(e: TouchEvent) {
    const touch = e.touches[0];
    this.mouse.x = touch.clientX;
    this.mouse.y = touch.clientY;
  }

  panmove(e: TouchEvent) {
    const touch = e.touches[0];
    const dx = touch.clientX - this.mouse.x;
    const dy = touch.clientY - this.mouse.y;
    this.zui.translateSurface(dx, dy);
    this.mouse.set(touch.clientX, touch.clientY);
  }

  pinchstart(e: TouchEvent) {
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

  pinchmove(e: TouchEvent) {
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
