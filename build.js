const fs        = require( 'fs' )
const path      = require( 'path' )

// Metalsmith stuff
const Metalsmith  = require( 'metalsmith' )
const markdown    = require( 'metalsmith-markdownit' )
const layouts     = require( 'metalsmith-layouts' )
const include     = require( 'metalsmith-include')
const inplace     = require( 'metalsmith-in-place' )
const pug         = require( 'metalsmith-pug' )

const config = {
  source: 'source',
  buildPath: '_build'
}


Metalsmith(__dirname)
  .source( config.source )
  .destination( config.buildPath )
  .clean(true)
  .use(include())
  .use(markdown({
    html: true,
    xhtmlOut: true,
    typographer: true,
    linkify: true
  }))
  .use(layouts({
    engine: 'pug',
    pretty: true,
    moment: require( 'moment'),
    contrast: require( 'get-contrast'),
    directory: 'templates',
    default: 'partials/skeleton.pug',
    pattern: '**/*.html'
  }))
  .build(function (err) {
    if (err) {
      console.log(err)
    } 
    else {
      console.log('Metalsmith complete!\n')
    }
  })