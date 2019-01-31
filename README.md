# Introduction

This project is inspired by this article series: [Let's build a browser engine!](https://limpet.net/mbrubeck/2014/08/08/toy-layout-engine-1.html), and I learned a lot from it.

The implementation mentioned above is in Rust language, as I want to practice programming in Typescript and how CSS box model works under the hood, I decided to implement one as well.

# Scope

The goal is to render just simple div boxes, which means that we only deal with block level elements(to understand display:block), no inline element, no text rendering or more fancy flex... animation... 

In a word, we have only boxes with solid color, :)

# Examples

We will build a simple renderer that takes html&css files as input, and the output is png file.

* square with solid color, a single div box; corresponding input files: [html](https://ianpas.github.io/layout-edu/basic/)

![](https://github.com/ianpas/layout-edu/blob/master/doc/main-basic.png)

* squares with alpha blend; [html](https://ianpas.github.io/layout-edu/alpha-blend/)

![](https://github.com/ianpas/layout-edu/blob/master/doc/main-alpha-blend.png)

* concentric rectangles, or nested boxes; [html](https://ianpas.github.io/layout-edu/concentric/)

![](https://github.com/ianpas/layout-edu/blob/master/doc/main-concentric.png)

In fact, if you can render individual box, then you can treat it as single pixel and render anything, theoretically. Thus you can convert png file to html&css files as input of our renderer and get png file back!

* png file as thousands of div boxes; [html-chinese-knot](https://ianpas.github.io/layout-edu/png2html/chinese-knot/), [html-spring](https://ianpas.github.io/layout-edu/png2html/spring/)

![](https://github.com/ianpas/layout-edu/blob/master/doc/main-chinese-knot.png)

![](https://github.com/ianpas/layout-edu/blob/master/doc/main-spring.png)

# Docs 

Documents, or notes about this implementation, wiil be in issues of this project. You may find it helpful when you want to implement your own layout engine.

# Project Structure


* /out : output of generated png files
* /src : 
  * /src/pipeline : about the rendering process
  * /src/png2html : convert png to html&css files
  * ...
* /test :
  * /test/pipeline: test rendering
  * /test/png2html: test converting png to html&css files
  * ...
* ...
# Local setup

Run "npm install" to install packages required by this project.

```
$ npm install
```

You may want to run "npm test" to generate above mentioned examples in /out folder, and then explore the code.

```
$ npm test
```

# License

MIT
