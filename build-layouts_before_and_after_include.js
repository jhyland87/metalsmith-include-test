// Build with layouts() BEFORE & AFTER include()
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
  source: 'source/layouts_before_and_after_include',
  buildPath: '_build/layouts_before_and_after_include'
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
  .use(layouts({
    engine: 'pug',
    pretty: true,
    directory: 'templates',
    pattern: '**/*.html'
  }))
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
 * Resulting content of _build/hello-world.html
 * @note The head.md is created just fine with the rendered head.pug template - but the hello-world.md is included twince

<!-- Begin: hello-world.pug  -->
<!-- Begin: head.pug  --><p>(File: <a href="http://head.md">head.md</a>) When viewing hello-world.html, you’ll see this sentence, but no rendered data from head.pug</p>

<p>(File: head.pug)  This is the content that doesn't get rendered when this file is included</p>
<!-- End: head.pug  -->
<!-- Begin: hello-world.pug  --><p>(<a href="http://hello-world.md">hello-world.md</a>) This file should show the rendered HTML data from head.pug, but it only shows the content from <a href="http://head.md">head.md</a></p>

<p>(File: hello-world.pug) This page includes the content from head.md, but not the rendered data from head.pug</p>
<!-- End: hello-world.pug  -->
<p>(File: hello-world.pug) This page includes the content from head.md, but not the rendered data from head.pug</p>
<!-- End: hello-world.pug  -->
*/