const domEvents    = require('dom-events');
const eventEmitter = require('event-emitter');
const windowSize   = require('./window-size');
const { TweenMax } = require('gsap');
import { eventBus, device } from './vue-utils';

export default {

  ee : new eventEmitter({}),

  init : function () {
    this.width         = 0;
    this.height        = 0;
    this.halfWidth     = 0;
    this.halfHeight    = 0;
    this.xOffset       = 0;
    this.yOffset       = 0;
    this.xOffsetSmooth = 0;
    this.yOffsetSmooth = 0;

    if (device.isTouch) return;

    this.resize = this.resize.bind(this);
    domEvents.on(window, 'resize', this.resize);
    this.resize();

    domEvents.on(document, 'mousemove', (e) => {
      var x = e.clientX;
      var y = e.clientY;
      if (x >= this.halfWidth) {
        this.xOffset = -(x - this.halfWidth) / this.halfWidth;
      }
      else if (x < this.halfWidth) {
        this.xOffset = (1 - x / this.halfWidth);
      }
      if (y >= this.halfHeight) {
        this.yOffset = -(y - this.halfHeight) / this.halfHeight;
      }
      else if (y < this.halfHeight) {
        this.yOffset = (1 - y / this.halfHeight);
      }

      eventBus.$emit('mouseMove', this);
      // this.ee.emit('move', this);

      // TweenMax.ticker.fps(60);

      TweenMax.to(this, 1.5, {
        xOffsetSmooth : this.xOffset,
        yOffsetSmooth : this.yOffset,
        overwrite     : 'all',
        ease          : Power2.easeOut,
        onUpdate      : (arg) => {
          // Update happens every time it eases
          eventBus.$emit('mouseUpdate', this);
          // this.ee.emit('update', this);
        }
      });
    });
  },

  resize : function () {
    var size        = windowSize();
    this.width      = size.w;
    this.height     = size.h;
    this.halfWidth  = this.width / 2;
    this.halfHeight = this.height / 2;
  }

};
