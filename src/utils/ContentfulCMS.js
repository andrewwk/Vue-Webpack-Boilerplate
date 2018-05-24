import * as contentful from 'contentful';
import _get            from 'lodash/get';
import _sortBy         from 'lodash/sortBy';
import _filter         from 'lodash/filter';
import _find           from 'lodash/find';

export default class ContentfulMS {

  constructor({ spaceID, accessToken }) {
    // Required arguments for constructor
    this.spaceID     = spaceID;
    this.accessToken = accessToken;

    this.client = contentful.createClient({
      // This is the space ID. A space is like a project folder in Contentful terms
      space       : this.spaceID,
      // This is the access token for this space. Normally you get both ID and the token in t, ""he
      // Contentful web app
      accessToken : this.accessToken
    });

    this.getEntriesByType = this.getEntriesByType.bind(this);
    this.init             = this.init.bind(this);
    this.getEntryByID     = this.getEntryByID.bind(this);
  }

  init() {
    return new Promise((resolve, reject) => {
      this.client.getEntries({
        include : 10,
        limit   : 1000
      }).then((response) => {
        this.data = response;
        // console.log('response:', response);
        resolve(this.data);
      }).catch((err) => {
        console.error('ContentfulCMS init error:', err);
        console.trace(err);
      });
    });
  }

  getEntriesByType(type) {
    const entries = _get(this.data, 'items', []);
    return _filter(entries, (entry) => entry.sys.contentType.sys.id === type);
    // return this.getEntryByID('2jpIGbY90kcmKOkiMAmqyS');
  }

  getEntryByID(id) {
    // This version returned undefined
    // const entries = _get(this.data, 'items', []);
    // const results = _filter(entries, (entry) => entry.sys.id === id);
    // return results;

    const results = _filter(this.data.items, (entry) => entry.sys.id === id);
    return (results.length > 0) ? results[ 0 ] : [];

    // const [ results ] = this.data.items.filter(entry => entry.sys.id === id);
    // return results;
  }

  compressImage(url, qualityCompression = 100, width = 1440, height) {
    const reformattedURL = url.replace('downloads.contentful', 'images.contenful');
    return `${reformattedURL}?fm=jpg&q=${qualityCompression}&w=${width}` + ((height) ?
                                                                            `&h=${height}` :
                                                                            '');
  }
}

