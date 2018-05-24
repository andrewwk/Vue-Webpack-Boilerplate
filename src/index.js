import Vue        from 'vue';
import Meta       from 'vue-meta';
import domEvents  from 'dom-events';
import { ResizeObserver } from 'vue-resize';
import router     from './router';
import App        from './components/App';
import resizeUtil from './utils/resize-util';
import vueUtils   from './utils/vue-utils';
import loadFonts          from './utils/FontLoader';

Vue.component('resize-observer', ResizeObserver);

Vue.use(vueUtils);

// SEO meta tag content injection
Vue.use(Meta, {
  keyName      : 'metaInfo',
  attribute    : 'data-vue-meta',
  tagIDKeyName : 'vmid'
});

const vueApp = new Vue({
  router,
  components : {},
  render     : (h) => h(App),
  metaInfo   : {
    // Default title
    // TODO: Change for deployment
    title : 'Development',

    // all titles will be injected into this template
    // TODO: Change for deployment
    // titleTemplate: 'Y&R | %s',
    titleTemplate : 'REPLACE WITH PROJECT NAME | %s',

    // When using meta tags, use 'vmid' property if the tags must be overwritten by other
    // pages/compoents. Otherwise, there will be multiple tags of the same type.
    meta : [
      // Static tags that will not be overwritten
      {
        property : 'og:site_name',
        content  : 'REPLACE WITH PROJECT NAME'
      },
      {
        property : 'og:type',
        content  : 'website'
      },
      // { property : 'og:url', content : window.location.href },

      // TODO: Verify correct twitter data with AOS
      {
        property : 'twitter:card',
        content  : 'summary'
      },
      {
        property : 'twitter:site',
        content  : 'REPLACE WITH PROJECT NAME'
      },

      // Dynamic tags that vue will overwrite
      {
        vmid     : 'og:url',
        property : 'og:url',
        content  : window.location.href
      }
    ],
    link : [
      {
        rel  : 'canonical',
        href : window.location.href
      }
    ]
  }

});

/**
 * The js content gets injected into the head of the document, so we need to wait for the document
 * to finish loading before we mount the app.
 * If we don't wait, none of the vue/javascript content will be rendered.
 */
domEvents.on(window, 'DOMContentLoaded', () => {

  // Setup resize
  domEvents.on(window, 'resize', (arg) => {
    resizeUtil.onResize();
  });
  resizeUtil.onResize();

  Promise.all([ loadFonts(), vueApp.$cms.init() ]).then((fonts, contentfulEntries) => {

    vueApp.$mount('#app');

  }).catch((err) => {
    console.error('font load error', err);
  });
});


