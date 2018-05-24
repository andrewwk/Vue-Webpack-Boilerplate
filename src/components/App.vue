<template>
  <div id="app">
    <h1>Main Vue App</h1>

    <transition name="section"
                v-bind:css="false"
                v-on:leave="sectionLeave"
                v-on:enter="sectionEnter"
                appear
                mode="out-in">
      <router-view class="vue-router-section"
                   :key="$route.fullPath"
                   ref="sectionView"></router-view>
    </transition>

  </div>
</template>

<script>
  import Logo      from './Logo.vue';
  import Footer    from './Footer.vue';
  import Nav       from './Nav.vue';
  import Login     from './Login.vue';
  import Analytics from '../utils/Analytics';
  import device    from '../utils/device';
  import $         from 'jquery';

  export default {
    name       : 'app',
    components : {},
    mounted() {
    },
    methods    : {
      sectionEnter(el, done) {
        TweenMax.fromTo(el, 0.5, { autoAlpha : 0 }, {
          autoAlpha  : 1,
          ease       : Sine.easeOut,
          onComplete : done
        });
        // TweenMax.to(el, 0.5, {
        //   opacity    : 1,
        //   onComplete : done,
        //   ease       : Sine.easeOut
        // });
      },
      sectionLeave(el, done) {
        TweenMax.fromTo(el, 0.5, { autoAlpha : 1 }, {
          autoAlpha  : 0,
          ease       : Sine.easeOut,
          onComplete : done
        });
        // TweenMax.to(el, 0.5, {
        //   opacity    : 0,
        //   onComplete : done,
        //   ease       : Sine.easeOut
        // });
      }
    },
    watch      : {
      $route(to, from) {
        // if (from) {
        //   // Delay Dispatching Event to give vue page to load.
        //   // Otherwise, the page title for analytic will always be a page behind.
        //   setTimeout(() => {
        //     Analytics.trackPage(to.fullPath);
        //   }, 1000)
        // }
      }
    },
    computed   : {},
    data() {
      return {};
    }
  };
</script>


<style lang="scss">
  @import "../styles/vars";
  @import "../styles/index";
  html, body {
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    image-rendering: -moz-crisp-edges;
    image-rendering: -o-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    -ms-interpolation-mode: nearest-neighbor;

    .safari-image-rendering {
      image-rendering: auto;
    }
  }
  body {
    #app {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      display: block;
      overflow: hidden;

      color: #000000;
      background-color: rgba(1.0, 1.0, 1.0, 1.0);

      line-height: 1.0em;
    }
  }

</style>
