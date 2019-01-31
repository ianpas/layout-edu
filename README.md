# layout-edu

This project is inspired by this article series: [Let's build a browser engine!](https://limpet.net/mbrubeck/2014/08/08/toy-layout-engine-1.html), and I learned a lot from it.

The implementation mentioned above is in Rust language, as I want to practice programming in Typescript and how CSS box model works under the hood, I decided to implement one as well.

# Scope

The goal is to render just simple div boxes, which means that we only deal with block level element(to understand display:block), no inline element, no text rendering or more fancy flex... animation... 

In a word, we have only boxes with solid color, :)

# Example

We will build a simple renderer that takes html&css files as input, and the output is png file.

