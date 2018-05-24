import windowSize from './window-size';
import eventBus from './event-bus';

// This util keeps track of window resizing and dispatched an event on the global eventBus

export default {

  onResize(){
    let size = windowSize();
    this.width = size.w;
    this.height = size.h;

    eventBus.$emit('windowResize', this.width, this.height);
  },

  width: 0,
  height: 0

}
