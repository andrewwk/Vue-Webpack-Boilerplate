import resizeUtil from './resize-util';
import eventBus from './event-bus';
import DevicePlugin from './DevicePlugin';

const device = new DevicePlugin();

export { eventBus, device };

export default {

  install(Vue, options) {

    Vue.prototype.$utils = {};

    Vue.prototype.$windowSize   = resizeUtil;
    Vue.prototype.$eventBus     = eventBus;
    Vue.prototype.$device = device;

  }

}
