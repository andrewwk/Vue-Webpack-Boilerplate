<template>
  <div class="component-image-pre-loader">
    <resize-observer @notify="handleResize" />

    <!--<loader :pause="isReady" v-if="!isReady"/>-->

    <transition name="pre-load-fade">
      <div class="pre-loader-overlay" v-show="!isReady"></div>
    </transition>

    <transition name="pre-load-fade" appear>
      <!-- IMAGE NEEDS TO FILL THE CONTAINER - SIDE BY SIDE IMAGES-->
      <img
        :src="imageSource"
        v-on:load="imageReady"
        :style="styles"
        v-show="isReady"
        v-if="imageFill"
        ref="image"
      />
      <!-- IMAGE HEIGHT AUTO, WIDTH 100%, NO NEED TO FIT ASPECT - FULL WIDTH IMAGE -->
      <img
        :src="imageSource"
        v-on:load="imageReady"
        v-show="isReady"
        v-else
        ref="image"
      />
    </transition>

  </div>
</template>

<script>
  import { TweenMax } from 'gsap';
  import aspectFill   from 'aspect-fill';

  export default {
    name       : 'image-pre-loader',
    props      : {
      image     : {
        // type     : Object,
        required : true
      },
      imageFill : {
        type    : Boolean,
        default : function () {
          return false;
        }
      }
    },
    components : {},
    created() {
    },
    mounted() {
      this.isReady = this.isImageComplete();
    },
    watch      : {
      isReady : {
        immediate : true,
        handler   : 'setImageSize'
      }
      // image(newVal, oldVal) {
      //   if (newVal) this.isReady = false;
      //
      //   if (this.isString(newVal)) {
      //     this.imageSource = newVal;
      //   }
      // }
    },
    methods    : {
      imageReady(e) {
        this.isReady = true;
      },
      isString(image) {
        return (typeof image === 'string');
      },
      isObject(image) {
        return (typeof image === 'object');
      },
      isImageComplete() {
        return this.$refs.image ? this.$refs.image.complete : false;
      },
      centerImage(width, height, targetWidth) {
        this.styles.left = `${targetWidth / 2 - width / 2}px`;
        this.styles.top  = `${targetWidth / 2 - height / 2}px`;
      },
      setImageSize() {
        if ((this.isImageComplete() || this.isReady) && this.imageFill) {
          const targetWidth       = this.$el.offsetWidth;
          const { image }         = this.$refs;
          const { width, height } = aspectFill(image.naturalWidth, image.naturalHeight, targetWidth, targetWidth);
          this.styles.width       = `${width}px`;
          this.styles.height      = `${height}px`;
          this.centerImage(width, height, targetWidth);
        }
      },
      handleResize() {
        this.setImageSize();
      }
    },
    computed   : {},
    data() {
      // const isString = this.isString(this.image);
      // const isObject = this.isObject(this.image);
      const src = this.image.length > 0 ? this.image : '//:0';

      return {
        isReady     : false,
        imageSource : src,
        styles      : {
          width  : '',
          height : '',
          top    : 0,
          left   : 0
        }
      };
    }
  };
</script>

<style lang="scss" scoped>
  .component-image-pre-loader {
    position: relative;
    width: 100%;
    overflow: hidden;

    .pre-load-fade-enter-active {
      transition: opacity 0.5s ease-in-out;
    }
    .pre-load-fade-enter-to {
      opacity: 1;
    }
    .pre-load-fade-enter {
      opacity: 0;
    }
    .pre-loader-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      background-color: #FFFFFF;
    }
    img {
      position: relative;
      display: block;
      height: auto;
      width: 100%;
      z-index: 1;
    }
  }
</style>
