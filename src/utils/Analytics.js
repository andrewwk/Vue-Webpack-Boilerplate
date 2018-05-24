class Analytics {
  constructor() {
  }

  /**
   * Event Tracking
   * FieldName	     ValueType	Required	Description
   * eventCategory	  text	      yes	     Typically the object that was interacted with (e.g. 'Video')
   * eventAction	    text	      yes	     The type of interaction (e.g. 'play')
   * eventLabel	      text	      no	     Useful for categorizing events (e.g. 'Fall Campaign')
   * eventValue	      integer	    no	     A numeric value associated with the event (e.g. 42)
   */
  trackEvent({ category, action, label, val = 0 }) {
    if (ga){
      ga('send', 'event', category, action, `${label} | Page: ${val}`, 0);
      // console.log(`category => ${category}`);
      // console.log(`action => ${action}`);
      // console.log(`label => ${label}`);
      // console.log(`val => ${val}`);
    }
  }

  trackPage(page) {
    if (ga){
      ga('send', 'pageview', page);
      // console.log('pageview:', page);
    }
  }
}

const analytics = new Analytics();
export default analytics;

