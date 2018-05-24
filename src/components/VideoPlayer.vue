<template>
  <div class="component-video-player">
    <video
      ref="video"
      preload="auto"
      webkit-playsinline
      playsinline
      autoplay="true"
      volume="0"
      muted
      :style="styles"
    >
    </video>
  </div>

</template>

<script>
  import aspectFill from 'aspect-fill';

  export default {
    name       : 'video-player',
    props      : ['source'],
    components : {},
    created() {
    },
    mounted() {
      const { video } = this.$refs;
      video.src       = this.source ? this.source : this.video;
      video.loop      = true;

      // Event listener for when the video has complered loading. It will then call the sizing method.
      video.addEventListener('loadedmetadata', this.getVideoSize, false);

      // Resize video on window resize/
      this.$eventBus.$on('windowResize', this.setVideoSizeFill);
    },
    beforeDestroy() {
      this.$refs.video.removeEventListener('canplaythrough', this.getVideoSize);
    },
    methods    : {
      animateIn() {
        TweenMax.to(this.$el, 0.7, {opacity:1, ease:Linear.easeNone});
      },
      hide() {
        TweenMax.to(this.$el, 0.7, {opacity:0, ease:Linear.easeNone});
      },
      getVideoSize(e) {
        this.isVideoLoaded = true;

        const { videoHeight, videoWidth } = e.target;

        this.startingHeight = videoHeight;
        this.startingWidth  = videoWidth;

        this.setVideoSizeFill();

        this.$refs.video.play();

        this.$emit('videoLoaded');

        this.animateIn()
      },
      // Method to set the size for the video, once it has loaded, and on resize. ASPECT FILL
      setVideoSizeFill() {
        if (!this.isVideoLoaded) return;

        this.$nextTick((arg) => {
          const targetWidth  = this.$el.offsetWidth;
          const targetHeight = this.$el.offsetHeight;

          const size = aspectFill(this.startingWidth, this.startingHeight, targetWidth, targetHeight);

          const { width : finalWidth, height : finalHeight } = size;

          this.styles.width  = `${finalWidth}px`;
          this.styles.height = `${finalHeight}px`;
        });

      },
      // Method to set the size for the video, once it has loaded, and on resize. ASPECT FIT.
      setVideoSizeFit(e) {
        if (!this.isVideoLoaded) return;

        // const targetWidth  = this.$windowSize.width;
        const targetWidth  = this.$el.offsetWidth;
        const targetHeight = targetWidth * this.startingHeight / this.startingWidth;

        this.styles.width  = `${targetWidth}px`;
        this.styles.height = `${targetHeight}px`;

        // this.checkAspectRatio(targetWidth, targetHeight);
      },
      // Simple method to log out if the aspect ratio has been calculated correctly.
      checkAspectRatio(targetWidth, targetHeight) {
        const check = (this.startingWidth / this.startingHeight === targetWidth / targetHeight);
        console.log(`Video aspect ratio ${ check ? 'CORRECT' : 'INCORRECT'}`);
      }
    },
    computed   : {},
    data() {
      return {
        isVideoLoaded  : false,
        video          : '',
        startingWidth  : 0,
        startingHeight : 0,
        styles         : {
          width  : 0,
          height : 0
        }
      };
    }
  };
</script>

<style lang="scss" scoped>
  .component-video-player {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.01;
    overflow: hidden;

    video {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
