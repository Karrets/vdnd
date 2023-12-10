import Two from 'two.js';
import { ZUI } from 'two.js/extras/jsm/zui';
export default function ZUIfy(two, stage) {
    const domElement = two.renderer.domElement;
    const zui = new ZUI(stage);
    const mouse = new Two.Vector();
    let touches = {};
    let distance = 0;
    let dragging = false;
    const dragShape = null;
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
        //TODO: Implement logic for dragging multiple different shapes
        if (dragShape !== null) {
            const rect = dragShape.getBoundingClientRect();
            dragging =
                mouse.x > rect.left && mouse.x < rect.right && mouse.y > rect.top && mouse.y < rect.bottom;
        }
        window.addEventListener('mousemove', mousemove, false);
        window.addEventListener('mouseup', mouseup, false);
    }
    function mousemove(e) {
        const dx = e.clientX - mouse.x;
        const dy = e.clientY - mouse.y;
        if (dragging && dragShape !== null) {
            dragShape.position.x += dx / zui.scale;
            dragShape.position.y += dy / zui.scale;
        }
        else {
            zui.translateSurface(dx, dy);
        }
        mouse.set(e.clientX, e.clientY);
    }
    function mouseup() {
        window.removeEventListener('mousemove', mousemove, false);
        window.removeEventListener('mouseup', mouseup, false);
    }
    function mousewheel(e) {
        const dy = (e.wheelDeltaY || -e.deltaY) / 1000;
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
        const touch = e.touches[0];
        if (touch) {
            // Pass through for panning after pinching
            mouse.x = touch.clientX;
            mouse.y = touch.clientY;
        }
    }
    function panstart(e) {
        const touch = e.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
    }
    function panmove(e) {
        const touch = e.touches[0];
        const dx = touch.clientX - mouse.x;
        const dy = touch.clientY - mouse.y;
        zui.translateSurface(dx, dy);
        mouse.set(touch.clientX, touch.clientY);
    }
    function pinchstart(e) {
        for (let i = 0; i < e.touches.length; i++) {
            const touch = e.touches[i];
            touches[touch.identifier] = touch;
        }
        const a = touches[0];
        const b = touches[1];
        const dx = b.clientX - a.clientX;
        const dy = b.clientY - a.clientY;
        distance = Math.sqrt(dx * dx + dy * dy);
        mouse.x = dx / 2 + a.clientX;
        mouse.y = dy / 2 + a.clientY;
    }
    function pinchmove(e) {
        for (let i = 0; i < e.touches.length; i++) {
            const touch = e.touches[i];
            touches[touch.identifier] = touch;
        }
        const a = touches[0];
        const b = touches[1];
        const dx = b.clientX - a.clientX;
        const dy = b.clientY - a.clientY;
        const d = Math.sqrt(dx * dx + dy * dy);
        const delta = d - distance;
        zui.zoomBy(delta / 250, mouse.x, mouse.y);
        distance = d;
    }
    return zui;
}
