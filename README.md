# Vue-Webpack-Boilerplate

### Getting Started

###### Description: This is a Vue/Express/Webpack boilerplate

###### Requirements:
1. Node Version >=8.9.0
2. Yarn Package Manager* (NPM will be used as a fallback. However, mixing NPM and Yarn will cause issues.)

[*Installing Yarn](https://yarnpkg.com/en/docs/install)

###### Installing
 - yarn: use `yarn` or `yarn install`
 - npm : use `npm i` or `npm install`

###### Run
 - yarn: use 'yarn run dev`
 - npm: use 'npm run dev`

### Yarn Tips
###### Adding Dependencies
 - `yarn add [package]`
 - `yarn add [package]@[version]`
 - `yarn add [package]@[tag]`

###### Adding Dependencies With Flags
 - `yarn add [package] --dev`
 - `yarn add [package] --peer`
 - `yarn add [package] --optional`

###### Removing Dependencies
 - `yarn remove [package]`

##### Resolving Yarn Lockfile Conflicts
`rm yarn.lock && yarn && git add yarn.lock && git rebase --continue`

[Yarn Docs](https://yarnpkg.com/en/docs/usage)


### Components :
```
<!-- Home -->
metaInfo : {
	title : 'Home',
},

<!--  Objects -->
metaInfo : {
	// title will be injected into parent titleTemplate ex. Stacklab | 'Objects'
	title : 'Objects',
	meta : [
		{ charset: 'utf-8' },
		{ vmid: 'description', name: 'description', content: 'some content' }
	]
},
```
**To use props and/or component data, metaInfo should be a function**
```
metaInfo () {
	return {
		title: this.title,
		meta: [
			{ vmid: 'description', name: 'description', content: }
		]
	}
},
```

