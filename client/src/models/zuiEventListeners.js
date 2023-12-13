import Two from 'two.js';
import { ZUI } from 'two.js/extras/jsm/zui';

//The Two.js api / docs for this feature are abysmal, and I can't find any examples, so I'm using the one thing they gave me... :(
//https://two.js.org/docs/extras/zui/
//https://codepen.io/jonobr1/pen/PobMKwb

export default function addZUIListeners(two, stage, shapes) {
  let domElement = two.renderer.domElement;
  let zui = new ZUI(stage);
  let mouse = new Two.Vector();
  let touches = {};
  let distance = 0;

  let dragShapes = shapes;
  let curDragging = [];

  zui.addLimits(0.06, 8);

  domElement.addEventListener('mousedown', mousedown, false);
  domElement.addEventListener('mousewheel', mousewheel, false);
  domElement.addEventListener('wheel', mousewheel, false);

  domElement.addEventListener('touchstart', touchstart, false);
  domElement.addEventListener('touchmove', touchmove, false);
  domElement.addEventListener('touchend', touchend, false);
  domElement.addEventListener('touchcancel', touchend, false);

  function mousedown(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    curDragging = [];
    dragShapes.forEach((shape) => {
      let bounds = shape.getBoundingClientRect();
      if (
        mouse.x > bounds.left &&
        mouse.x < bounds.right &&
        mouse.y > bounds.top &&
        mouse.y < bounds.bottom
      ) {
        curDragging.push(shape);
      }
    });

    window.addEventListener('mousemove', mousemove, false);
    window.addEventListener('mouseup', mouseup, false);
  }

  function mousemove(e) {
    let dx = e.clientX - mouse.x;
    let dy = e.clientY - mouse.y;
    if (curDragging.length > 0) {
      curDragging.forEach((shape) => {
        shape.position.x += dx / zui.scale;
        shape.position.y += dy / zui.scale;
      });
    } else {
      zui.translateSurface(dx, dy);
    }
    mouse.set(e.clientX, e.clientY);
  }

  function mouseup(e) {
    window.removeEventListener('mousemove', mousemove, false);
    window.removeEventListener('mouseup', mouseup, false);
  }

  function mousewheel(e) {
    let dy = (e.wheelDeltaY || -e.deltaY) / 1000;
    zui.zoomBy(dy, e.clientX, e.clientY);
  }

  function touchstart(e) {
    switch (e.touches.length) {
      case 2:
        pinchstart(e);
        break;
      case 1:
        panstart(e);
        break;
    }
  }

  function touchmove(e) {
    switch (e.touches.length) {
      case 2:
        pinchmove(e);
        break;
      case 1:
        panmove(e);
        break;
    }
  }

  function touchend(e) {
    touches = {};
    let touch = e.touches[0];
    if (touch) {
      // Pass through for panning after pinching
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
    }
  }

  function panstart(e) {
    let touch = e.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
  }

  function panmove(e) {
    let touch = e.touches[0];
    let dx = touch.clientX - mouse.x;
    let dy = touch.clientY - mouse.y;
    zui.translateSurface(dx, dy);
    mouse.set(touch.clientX, touch.clientY);
  }

  function pinchstart(e) {
    for (let i = 0; i < e.touches.length; i++) {
      let touch = e.touches[i];
      touches[touch.identifier] = touch;
    }
    let a = touches[0];
    let b = touches[1];
    let dx = b.clientX - a.clientX;
    let dy = b.clientY - a.clientY;
    distance = Math.sqrt(dx * dx + dy * dy);
    mouse.x = dx / 2 + a.clientX;
    mouse.y = dy / 2 + a.clientY;
  }

  function pinchmove(e) {
    for (let i = 0; i < e.touches.length; i++) {
      let touch = e.touches[i];
      touches[touch.identifier] = touch;
    }
    let a = touches[0];
    let b = touches[1];
    let dx = b.clientX - a.clientX;
    let dy = b.clientY - a.clientY;
    let d = Math.sqrt(dx * dx + dy * dy);
    let delta = d - distance;
    zui.zoomBy(delta / 250, mouse.x, mouse.y);
    distance = d;
  }
}
