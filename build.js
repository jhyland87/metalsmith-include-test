const Metalsmith  = require( 'metalsmith' )
const layouts     = require( 'metalsmith-layouts' )
//const markdownit  = require('metalsmith-markdownit')
const markdownit  = require( '/Users/jhyland/Documents/Projects/metalsmith-markdownit' )
const include     = require( 'metalsmith-include' )
const inplace     = require( 'metalsmith-in-place')
const tidy = require('metalsmith-html-tidy');


const config = {
  source: 'src',
  buildPath: 'public'
}

let mkdnOpts = {
    typographer: true,
    html: true
  }

const mkdnitTests = [
  [{
    //preset: 'general',
    options: mkdnOpts,
    render: 'inline'
  }],
  [{
    options: mkdnOpts,
    render: 'inline'
  }],
  [{
    options: mkdnOpts,
    //preset: 'general',
    render: 'inline'
  }]
]

const ms = Metalsmith(__dirname)
  .source( config.source )
  .destination( config.buildPath )
  .clean(true)
  .use(markdownit({
    options: {
      html: true,
      xhtmlOut: true,
      typographer: true,
      linkify: true
    },
    render: 'inline'
  }))
  .use(inplace({
    engine: 'pug',
    pattern: "**"
  }))
  .use(include({
    engine:'pug',
    inPlace: true,
    deletePartials: false
  }))
  .use(layouts({
    engine: 'pug',
    pretty: true,
    directory: 'templates'
  }))
  .use(include({
    engine:'pug',
    inPlace: true,
    deletePartials: false
  }))
  .use(tidy({
    pattern: '**/*html',
    tidyOptions: {
      'indent-spaces': 2,
      'drop-empty-paras': false,
      'drop-empty-elements': false,
      'merge-divs': false,
      'merge-emphasis': false
    }
  }))
  .build(function(err, files){
    if (err) {
      console.log('ERROR:',err)
      return
    }
     
    console.log( 'Build Completed' )
    console.log( 'Files:', Object.keys( files ) )
  })