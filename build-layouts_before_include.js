// Build with layouts() BEFORE include()
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
  source: 'source/layouts_before_include',
  buildPath: '_build/layouts_before_include'
}

Metalsmith(__dirname)
  .source( config.source )
  .destination( config.buildPath )
  .clean(true)
  .use(markdown({
    html: true,
    xhtmlOut: true,
    typographer: true,
    linkify: true
  }))
  .use(layouts({
    engine: 'pug',
    pretty: true,
    directory: 'templates',
    pattern: '**/*.html'
  }))
  .use(include())
  .build(function (err, files) {
    if (err) {
      console.log(err)
      return
    } 
    
    var fileNames = Object.keys( files )

    console.log( 'Metalsmith complete!\n' )

    console.log( 'Static HTML files created:' )

    for( var i = 0; fileNames.length > i; i++ ){ 
      console.log( '\t%s) %s/%s', i+1, config.buildPath, fileNames[i] )
    }
  })

/**
 * Resulting content of _build/layouts_before_include/hello-world.html
 * @note Neither the rendered head.pug template or the content of head.md is included in the hello-world result
 
<!-- Begin: hello-world.pug  --><p>(<a href="http://hello-world.md">hello-world.md</a>) This file should show the rendered HTML data from head.pug, but it only shows the content from <a href="http://head.md">head.md</a></p>

<p>(File: hello-world.pug) This page includes the content from head.md, but not the rendered data from head.pug</p>
<!-- End: hello-world.pug  -->
*/