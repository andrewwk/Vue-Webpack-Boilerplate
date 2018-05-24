import Prismic         from 'prismic-javascript';
import { RichText }    from 'prismic-dom';
import { get as _get } from 'lodash';

export default class PrismicCMS {
  constructor({ apiEndpoint, apiToken }) {
    // Required arguments for constructor
    this.apiEndpoint = apiEndpoint;
    this.apiToken    = apiToken;

    // Results of init function cms calls.
    this.api  = null;
    this.data = null;

    // Hash table for section id's
    this.sectionIDs = {
      home      : 'WmYwKCcAAFUBCRlw',
      investors : 'WmY3gycAAEXtCTnw',
      contact   : 'WmY3ZicAAEwCCTlx',
      about     : 'WmY3QScAAFUBCTjF'
    };
  }

  static linkResolve(doc) {
    let url = '';

    switch (doc.type) {
      case 'WmYwKCcAAFUBCRlw':
        url = '/';
        break;
      case 'WmY3gycAAEXtCTnw':
        url = '/investors';
        break;
      case 'WmY3ZicAAEwCCTlx':
        url = '/contact';
        break;
      case 'WmY3QScAAFUBCTjF':
        url = '/about';
        break;
      // Fallback for other types, in case new custom types get created
      default:
        url = '/';
        break;
    }
    return url;
  }

  init() {
    return new Promise((resolve, reject) => {
      Prismic.getApi(this.apiEndpoint, { accessToken : this.apiToken }).then((api) => {
        this.api = api;

        // An empty query will return all the documents
        const data = api.query('');

        resolve(data);
      }).then((response) => {
        if (response) {
          console.log('Prismic response:', response);
        }
      }, (err) => {
        console.log('Prismic Init Error: ', err);
        reject(err);
      });
    });
  }

  getSectionID(name) {
    return this.sectionIDs[ name ] ? this.sectionIDs[ name ] : null;
  }

  getSection(name) {
    const id = this.getSectionID(name);

    const [ section ] = id ?
                        this.data.results.filter(d => d.id === id) :
                        this.data.results.filter(d => d.slugs.indexOf(name) !== -1);
    return section;
  }

  getDataByID(id) {
    const [ result ] = this.data.results.filter(d => d.id === id);
    return result;
  }

  getLocations() {
    const locations = this.data.results.filter(val => val.type === 'location');
    return locations.map((location) => {
      const data = location.data;

      for (let entry in data) {
        if (data[ entry ][0].text) {
          data[ entry ] = data[ entry ][0].text;
        }
      }

      return data;
    });
  }

  getItemText(item) {
    return _get(item, '[0].text', null);
  }

  renderAsHTML(content) {
    return RichText.asHtml(content, PrismicCMS.linkResolve);
  }

  renderAsText(content) {
    return RichText.asText(content);
  }
}

