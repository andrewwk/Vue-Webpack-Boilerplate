const UserSessionPlugin = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install(Vue, options) {

    Vue.mixin({
      mounted() {
        // console.log('User Session Plugin Mounted');
        // console.log('this.isUserLoggedIn:', this.isUserLoggedIn);
      },
      data() {
        return {
          isUserLoggedIn : false
        }
      },
      watch: {
        // isUserLoggedIn(val, oldVal) {
        //   console.log('Change isUserLoggedIn:', val);
        //   this.isUserLoggedIn = val;
        // }
      }
    });

    // Vue.isUserLoggedIn = false;
    Vue.prototype.$isUserValiated = this.isUserLoggedIn;

    // Instance methods
    Vue.prototype.$checkUserValidation = function() {
      return this.isUserLoggedIn;
    };

    Vue.prototype.$setUserSession = function(valid) {
      this.isUserLoggedIn = valid;
    }
  }
};


export default UserSessionPlugin;
