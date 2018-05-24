const Promise      = require('bluebird');
const contentful   = require('contentful');
const _filter      = require('lodash/filter');
const _get         = require('lodash/get');
const _sortBy      = require('lodash/sortBy');

const SPACE_ID     = 'c8nbxa8b21dd';
const ACCESS_TOKEN = '6d003294eec0585b9bc6e606d815452c7cca51839597f45b74463b03fd30b642';
const BASE_URL     = `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}&include=3`;

var client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space       : SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in t, ""he
  // Contentful web app
  accessToken : ACCESS_TOKEN
});

let data = null;

var controller = {

  loadData : function () {

    return new Promise((resolve, reject) => {
      client.getEntries({ include : 10, limit : 1000 }).then((response) => {
        data = response;
        // console.log('cms data:', data);
        resolve(data);
      });
    });

  },

  getEntriesByType : function (type) {
    // console.log('type:', type);
    return _filter(data.items, (entry) => {
      return entry.sys.contentType.sys.id == type;
    });

  },

  getEntriesById : function (id) {
    return _filter(data.items, (entry) => {
      return entry.sys.id == id;
    });
  },

  sortItemsBySlug(items, slug) {
    return _sortBy(items, (i) => {
      return (i.fields.slug == slug) ? 0 : 1;
    });
  },

  //SECTIONS

  getProjectsPage : function () {

    var projects = this.getEntriesByType('projects');
    // console.log('projects:', projects);
    if (projects) {
      return _get(projects, '[0].fields', "");
    }
    return [];

  },

  getObjectsPage : function () {

    var objects = this.getEntriesByType('objects');
    // console.log('objects:', objects);
    if (objects) {
      return _get(objects, '[0].fields', "");
    }
    return [];

  },

  getContactPage : function () {

    var contactPage = this.getEntriesByType('contactPage');
    // console.log('contactPage:', contactPage);
    if (contactPage) {
      return _get(contactPage, '[0].fields', "");
    }
    return [];

  },

  getDealersPage : function () {

    var dealersPage = this.getEntriesByType('dealersPage');
    // console.log('dealersPage:', dealersPage);
    if (dealersPage) {
      return _get(dealersPage, '[0].fields', "");
    }
    return [];

  },

  getPracticePage : function (type) {
    let projectId = "4Dzs2CLrBKGemU2wEEkAQe";
    let objectId = "76pRyusUaAKiA0w46ecooy";
    
    let practicePage;
    if (type == 'object') {
      practicePage = this.getEntriesById(objectId);
    } else if (type == 'project') {
      practicePage = this.getEntriesById(projectId);
    }
    // var practicePage = this.getEntriesByType('practicePage');
    if (practicePage) {
      return _get(practicePage, '[0].fields', "");
    }
    return [];
  },

  //CONTENT

  getProjects : function () {
    var projects = this.getEntriesByType('project');
    // console.log('projects:', projects);
    if (projects) {
      return projects;
    }
    return [];

  },

  getProjectsByCategory(category) {
    const [all]           = data.items.filter(e => e.sys.id === '45NoL23mDm8ymSa8eA2wiq');
    const [categoryItems] = all.fields.categories.filter(c => c.fields.slug === category);
    // console.log('categoryItems.fields.items:', categoryItems.fields.items);
    return categoryItems.fields.items;
  },

  getObjects : function () {

    var objects = this.getEntriesByType('object');
    // console.log('objects:', objects);
    if (objects) {
      return objects;
    }
    return [];

  },

  getPress : function () {

    let press = this.getEntriesByType('press');
    // console.log('press:', press);
    if (press) {
      return press;
    }
    return [];
  },

  getCategories : function () {

    var categories = this.getEntriesByType('category');
    // console.log('categories:', categories);
    if (categories) {
      return categories;
    }
    return [];

  },

  getFeatures : function () {

    var features = this.getEntriesByType('feature');
    // console.log('features:', features);
    if (features) {
      return features;
    }
    return [];

  },

  compressImage(url, qualityCompression=100, width = 1440, height) {
    const reformattedURL = url.replace('downloads.contentful', 'images.contenful');
    return `${reformattedURL}?fm=jpg&q=${qualityCompression}&w=${width}` + ( (height)?`&h=${height}`:'' ) ;
  },

  getFeaturedObject : function () {
    let objPage = this.getObjectsPage();
    if (objPage.featuredObject) {
      return objPage.featuredObject.fields;
    } else {
      return null;
    }
  },

  getFeaturedProject : function () {
    let proPage = this.getProjectsPage();
    if (proPage.featuredProject) {
      return proPage.featuredProject.fields;
    } else {
      return null;
    }
  },

}

module.exports = controller;
