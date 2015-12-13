# Super GiGi
**Super GiGi** is a CSS3 flex based grid system. 
It's developed thinking about modern web applications and its first purpose is 
to make easier to manage responsive layout.
It's developed in Sass but you can use a compiled version if you prefer. 

<br/>
## Installation
You can choose different ways to install **Super GiGi**:

- [Download the latest release](https://github.com/Objectway/super-gigi/zipball/master).
- Clone the repo: `https://github.com/Objectway/super-gigi.git`.
- Install with [Bower](http://bower.io): `bower install super-gigi -S`.
- Install with [npm](https://www.npmjs.com): `npm install super-gigi -D`.

After the download you can choose if use the compiled version including `[path to super-gigi]/dist/supergigi.css`.

Or you can use the Sass version, with all the options and mixins below, importing
in your sass `[path to super-gigi]/dist/_main.scss`.

<br/>
## Options
If you are using the Sass version you can personalize **Super GiGi**
simply changing the value of its variables before importing `main.scss`. 

For the size variables, you would like to have the [`rem/em-calc()`](#rem-calc)
functions available. To achieve that remember to import the `_functions.scss` partial
before.

### $rem-base
default: `16px` - type: `unit`  

This is the default value for all the
[units functions](#functions). 
set the same value you've used for your `html`.

<br/>
### $row-width
default: `rem-calc(1920)` - type: `unit` 

This is the `max-width` of our row objects. The default value is 1920 pixels 
converted in rems via [`rem-calc()`](#rem-calc) function.

<br/>
### $column-gutter
default: `rem-calc(30)` - type: `unit` 

This is the space between our columns. The default value is 30 pixels converted in rems via [`rem-calc()`](#rem-calc) function. 

<br/>
### $grid-columns
default: `12` - type: `number` 

The number of columns used in our layout.

<br/>
### $use-classes
default: `false` - type: `boolean` 

Set this variable to true if you want to generate static classes, like: 
`.row`, `.column` or `.large-12`. 

<br/>
### $use-placeholders
default: `false` - type: `boolean` 

Set this variable to true if you want to generate placeholders to us like: 

```scss
.column {
  @extend %column;
  @extend %large-12;
}
```

<br/>
### $row-name
default: `row` - type: `string` 

This option will change the name of the row object classes or placeholder.

<br/>
### $column-name
default: `column` - type: `string` 

This option will change the name of the column object classes or placeholder. 

<br/>
### $use-bem
default: `false` - type: `boolean` 

This option will change the format of the class names generated when `$use-class` is `true`.

<br/>
### $bem-separator
default: `'--'` - type: `string` 

This option will change the separator between the block and the element whe using BEM naming.

<br/>
### $grid-start
default: `left` - type: `string` - possibile values: `left` or `right`

This is the value to change if you want to develop a rtl application.

<br/>
### $use-dry
default: `false` - type: `boolean` 

If true, all the grid will be passed by [`dry-it()`](#dry-it) mixin.

<br/>
### $debug
default: `false` - type: `boolean` 

With big applications and semantic BEM selectors, it is difficult to understand 
what kind of properties a determinate DOM element has. If you set this 
variable to `true`, **Super GiGi** will add a content property that will be 
useful when we inspect the elements.

**Example:**

```css
.fooColumn {
  font-size: 30px; }
  @media only screen and (min-width: 45em) {
    .fooColumn {
      left: 8.33333%;
      right: 8.33333%;
      padding: 0 0.9375rem;
      order: 0;
      
      content: "COLUMN: width : (xxsmall: 6, large: 6) | push : 1 | pull : 1 | order : 0 | global : true"; 
      
    } 
  }
```

<br/>
### $eq-grid `EXPERIMENTAL`
default: `false` - type: `boolean` 

**Super GiGi** supports [EQJS](https://github.com/Snugug/eq.js). Turn this option to
`true` to use element queries css instead of classical mediaqueries. See the [`media-query()`](#media-query) mixin for other infos. 

<br/>
### $breakpoints
default: ```(
  xxsmall: 0em, 
  xsmall: em-calc(480), 
  small: em-calc(640), 
  medium: em-calc(720), 
  large: em-calc(1024), 
  xlarge: em-calc(1280), 
  xxlarge: em-calc(1440)
  )```
  - type: `map`

Ok, this is a little complicated :) but we want to have this settings 
in only one place. This is a 
<a href="http://sass-lang.com/documentation/file.SASS_REFERENCE.html#maps" target="_blank">Sass map</a>, 
and is used to define all our mediaqueries.

The **keys** are used to define the name of our breakpoints and will be passed 
to our classes generator or to our mixins. For example if you use the classes 
and youchange this object like this: 

```scss
$breakpoints: (sml: 0em, mdm: 40em, lrg: 60em);
```

you will generate this kind of css:

```css
@media (min-width: 40em) {
  .mdm-3 {
    width: 25%; } }
@media (min-width: 40em) {
  .lrg-3 {
    width: 25%; }}
    
```
In the same way you have to change how you refer to breakpoints in all your mixins:

```scss
.foo {
  @include grid-row(false);
  &__bar {
    @include grid-column(
      $width: (sml:6, lrg: 6),
      $collapse: false,
      $push: (mdm:6, lrg: 12),
      $pull: 1,
      $order: 0
    );
  }
  &foo {
  	@include media-query(lrg) {
  	  background: red
  	}
  }
  
```

<br/>
### $use-flex `EXPERIMENTAL`
default: `true` - type: `boolean` 

**Super GiGi** is developed with CSS3 Flexbox, but there is an untested 
version in float. 
Set this option to `false`, to try it.

<br/>
### $query-direction `EXPERIMENTAL`
default: `(min-width, max-width)` - type: `list` 

**Super GiGi** is developed mobile first, but in some cases you would like to 
develop in graceful decadency. To do this you can set 
`$query-direction: (max-width, min-width)`. The media-queries will be reverted
and all the queries will go from the largest query to the smallest one.

<br/>

## Mixins
### media-query()
arguments: `$query`, `$only`, `$eq-grid`
- **$query**
  - optional
  - default: `xxsmall`
  - type: `string`
- **$until**
  - optional
  - default: `false`
  - type: `boolean` or `string`
- **$eq-grid**
  - optional
  - default: `false`
  - type: `boolean`

As you can guess, this is the mixin that generates our media or element query. 
The `$query` argument must be one of the `key` values defined 
in the [`$breakpoints`](#breakpoints) variable. 
**Super GiGi** is developed mobile first, so if you write 
`@include mediaquery(small){...}` you will target all the queries **from** `small`. 

If you want to trigger only a range you can pass `$until` parameter to your mixin implementation. 
`$until` accepts `only` or a [`$breakpoints`](#breakpoints) key value.
Example: 
```SCSS
.sausage {
  @include media-query(small, only) {
    content: "small only;"
  }
}

.eggplant {
  @include media-query(small, large) {
    content: "small to large;"
  }
}
```
will generate: 
```CSS
@media only screen and (min-width: 40em) and (max-width: 44.9375em) {
  .sausage {
    content: "small only;"; } }

@media only screen and (min-width: 40em) and (max-width: 79.9375em) {
  .eggplant {
    content: "small to large;"; } }
```

You can choose between classical 
<a href="http://www.w3.org/TR/css3-mediaqueries/" target="_blank">media query</a> 
or to use <a href="https://github.com/snugug/eq.js" target="_blank">element query</a>. 
You don't have to specify this setting everytime, **Super GiGi** provides a 
[global $eq-grid](#eq-grid) variable, but sometime is useful to mix media end 
element query.

###grid-space()
arguments: `$property`, `$attr`
- **$property**
  - optional
  - default: `width`
  - type: `string`
- **$attr**
  - optional
  - default: `auto`
  - type: `list`

When you are writing css in a grid, it's difficult to manage 
the measures sometime. `grid-space()` comes to help us in this ungrateful task! 
You must declare the property you want to set (for example: 
`margin-left`) changing the `$property` argument. 
After that you can pass how many column of the grid you want to take. 
For example assuming that we have `12` [`$grid-columns`](#grid-columns):

```scss
.foo {
  @include grid-space(margin-left, 5)
}
```
will return
```css
.foo {
  margin-left: 41.6667%
}
```
You can also express the number of column you want to use for your calculation, 
passing to `$attr` a sass list composed like 
that: `$column` **`of`** `$columns`. For example:
 
```scss
.foo {
  @include grid-space(margin-left, 1 of 2)
}
```
will return
```css
.foo {
  margin-left: 50%
}
```

<br/>
### grid-row()
arguments: `$nested`, `$vertical`
- **$nested**
  - optional
  - default: `true`
  - type: `boolean`
- **$vertical**
  - optional
  - default: `false`
  - type: `boolean`

This mixin will generate the **row element** of the grid. It's real simple, 
you may specify if the row is nested in another row (to reset the padding). 
The other option `$vertical` will simply add the CSS3 
`flex-direction: row-reverse` property to the element.

<br/>
### grid-column()
arguments: `$width`, `$offset`, `$push`, `$pull`, `$order`, `$collapse`, `$global`
- [**$width**](#gcwidthoffsetpushpull)
  - optional
  - default: `null`
- [**$offset**](#gcwidthoffsetpushpull)
  - optional
  - default: `null`
- [**$push**](#gcwidthoffsetpushpull)
  - optional
  - default: `null`
- [**$pull**](#gcwidthoffsetpushpull)
  - optional
  - default: `null`
- [**$order**](#gcorder)
  - optional
  - default: `null`
- [**$collapse**](#gccollapseglobal)
  - optional
  - default: `null`
  - type: `boolean`
- [**$global**](#gccollapseglobal)
  - optional
  - default: `true`
  - type: `boolean`

This is the most important mixin of our grid. And probabily it is the mixin 
that you will use more. Let's take a look at how it works:

```scss
.foo {
  @include grid-column(
      $width: (xxsmall:6, large: 6),
      $push: (xxsmall:6, large: 12),
      $pull: 1,
      $order: 0,
      $collapse: false,
      $global: true
    );
};
```
will generate:
```css
.foo {
  box-sizing: border-box;
  padding: 0 0.9375rem;
  display: flex;
  flex-direction: column;
  position: relative;
  right: auto;
  position: relative;
  left: auto;
  right: 8.33333%;
  padding: 0 0.9375rem;
  order: 0;
}
@media only screen and (min-width: 0em) {
  .foo {
    width: 50%; 
    left: 50%;
  } 
}
@media only screen and (min-width: 64em) {
  .foo {
    width: 50%; 
    left: 100%;
  } 
}
```
**note:** you see repeted properties, because we set pull and push for 
the same element. 

<div id="gcwidthoffsetpushpull"></div>
`$width`, `$offset`, `$push` and `$pull` have similar behaviors. They can be used in three different way.

**1 - Passing an integer**
```scss
.foo {
  @include grid-column($width: 1);
}
```
will return:
```css
.foo {
  box-sizing: border-box;
  padding: 0 0.9375rem;
  display: flex;
  flex-direction: column;
  width: 8.33333%;
}
```
The first four properties are the common behaviour of the column object, the 
relevant part is `width: 8.33333%`. This is calculated via 
[`grid-space() mixin`](#grid-space)


**2 - Passing a semantic list**
```scss
.foo {
  @include grid-column($width: 1 of 3);
}
```
will return:
```css
.foo {
  box-sizing: border-box;
  padding: 0 0.9375rem;
  display: flex;
  flex-direction: column;
  width: 33.33333%;
}
```
As before, the first four properties are the common rules of our column, the 
relevant part is `width: 33.33333%`. This is calculated via 
[`grid-space() mixin`](#grid-space)


**3 - Passing a queries map**
```scss
.foo {
  @include grid-column($width: (small: 6, medium: 4, large: 3));
}
```
will generate:

```css
.foo {
  box-sizing: border-box;
  padding: 0 0.9375rem;
  display: flex;
  flex-direction: column;
}
@media only screen and (min-width: 40em) {
  .foo {
    width: 50%; 
  } 
}
@media only screen and (min-width: 45em) {
  .foo {
    width: 33.33333%; 
  } 
}
@media only screen and (min-width: 64em) {
  .foo {
    width: 25%; 
  } 
}
```
As before, the first four properties are the common rules of our column, 
the relevant part are these in the media query. How you can see we have 
the widths of the column set in a responsive way.

**4 - Width**
As said before `$width`, `$offset`, `$push` and `$pull` have similar behaviors, but `$width` is obviously a bit different.

We've seen that you can pass to `$width` essentialy a number. When you do that,
`Super GiGi` will add to your css: `flex: 0 0 auto`. This is essential to our flex grid to work. 

But you can set `$width` to `auto`, that will set the `width` css property to `auto` and the `flex` property to `1 1 0%`. 
With this option you can have columns that will take all the space available on
the row. If you have one column, that will take 100% of the space, if two that will take half each one and so on.

Another important option is to set `$width` to `0`. **This will not set `width` to 0%** (a column must have a minimun width). But the width will be `auto`.
In this way you can have a column with the width decided from the content.

**Note** we are preparing a visual example. Stay tuned.

<div id="gcorder"></div>
**$order** is similar, you can set it only in two ways, 
via `integer` or via `map`.
It will set the css3 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/order" target="_blank">`order`</a>. 
Let see an example:

```scss
.foo {
  @include grid-column($order: 3)
}
.bar {
  @include grid-column($order: (small: 6, medium: 4, large: 3))
}
```
will compile in:
```css
 .foo {
  box-sizing: border-box;
  padding: 0 0.9375rem;
  display: flex;
  flex-direction: column;
  width: auto;
  order: 3;
}

.bar {
  box-sizing: border-box;
  padding: 0 0.9375rem;
  display: flex;
  flex-direction: column;
  width: auto;
}
@media only screen and (min-width: 40em) {
  .bar {
    order: 6; 
  } 
}
@media only screen and (min-width: 45em) {
  .bar {
    order: 4; 
  } 
}
@media only screen and (min-width: 64em) {
  .bar {
    order: 3; 
  } 
}
```
<div id="gccollapseglobal"></div>
**$collapse** and **$global** are very simple. The first one if `false` will 
generate the padding of our columns `padding: 0 0.9375rem;`, the second one 
will generate this css:
```css
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
```
aka the common properties that defines our columns. 
<br />
 
### show-from()
arguments: `$query`
- **$query**
  - required
  - default: `null`
  - type: `string`
This is the first of **Super GiGi**'s visibility mixins. It simple takes a `$query` argument 
and sets the element to `display: none;` until the passed `$query`, where the 
element will take the property: `display: inherit`. Example
```scss
.foo {
  @include show-from(small);
}
```
and magically:
```css
.foo {
  display: none; 
}
@media only screen and (min-width: 40em) {
  .foo {
    display: inherit; 
  } 
}
```
<br/>

###hide-from()
arguments: `$query`
- **$query**
  - required
  - default: `null`
  - type: `string`
Like `show-from()`. It simple takes a `$query` argument and sets the element to 
`display: inherit;` until the passed `$query`, where the element will take 
the property: `display: none`. Example:
```scss
.foo {
  @include hide-from(small);
}
```
will generate:
```css
.foo {
  display: inherit; 
}
@media only screen and (min-width: 40em) {
  .foo {
    display: none; 
  } 
}
 ```
<br/>

###show-for()
arguments: `$query`
- **$query**
  - required
  - default: `null`
  - type: `string`

In this case the element is hided by  `display: none;` and will have 
the property: `display: inherit` only for the selected media query range. 
Example:

```scss
.foo {
  @include show-for(small);
}
```
will generate:
```css
.foo {
  display: none; 
}
@media only screen and (min-width: 40em) and (max-width: 44.9375em) {
  .foo {
    display: inherit; 
  } 
}
 ```
<br/>

###hide-for()
arguments: `$query`
- **$query**
  - required
  - default: `null`
  - type: `string`

The last of our visibility mixins. This will hide the element with 
`display: none;` only for the selected media query range. Example:

```scss
.foo {
  @include hide-for(small);
}
```
will generate:
```css
.foo {
  display: inherit; 
}
@media only screen and (min-width: 40em) and (max-width: 44.9375em) {
  .foo {
    display: none; 
  } 
}
 ```
<br/>

<div id="dry-it"></div>
### dry-it()
arguments: `$id`
- **$id**
  - required
  - type: `string`

**NOTE**: This mixin will change the order of your generated css.

One of the bad thing that we have in developing a grid without a default classes
schema is that our result css code will be semantic... but not dry... You can 
serve the css with gzip, but you know that we will have a lot of redundant 
code...
**Example:**
```scss
.foo {
  @include grid-column((small: 12, large: 6));
}
.bar {
  @include grid-column((small: 12, large: 6));
}
```
will generate this css:
```css
.foo {
  box-sizing: border-box;
  padding: 0 0.9375rem;
  display: flex;
  flex-direction: column;
}
@media only screen and (min-width: 40em) {
  .foo {
    width: 100%; } }
@media only screen and (min-width: 64em) {
  .foo {
    width: 50%; } }

.bar {
  box-sizing: border-box;
  padding: 0 0.9375rem;
  display: flex;
  flex-direction: column;
}
@media only screen and (min-width: 40em) {
  .bar {
    width: 100%; 
  } 
}
@media only screen and (min-width: 64em) {
  .bar {
    width: 50%; 
  } 
}
```
The same code for two identical classes. 
Sass comes in our help with placeholders, but we must extend too many selector to
have a dry behavior. What if we can generate placeholders on fly? 
That is exactly what `dry-it()` does. You don't have to use it, this is already
in all our mixins seen before. For use it you must only set to `true` the 
[`$use-dry`](#use-dry) variable. And that is what will happen:
```scss
.foo {
  @include grid-column((small: 12, large: 6));
}
.bar {
  @include grid-column((small: 12, large: 6));
}
```
will generate this css:
```css
*.foo, *.bar {
  box-sizing: border-box;
  padding: 0 0.9375rem;
  display: flex;
  flex-direction: column; 
}

@media only screen and (min-width: 40em) {
  *.foo, *.bar {
    width: 100%; 
  } 
}

@media only screen and (min-width: 64em) {
  *.foo, *.bar {
    width: 50%; 
  } 
}
```

***IMPORTANT*** To use this option is preferable to order your media query smaller to larger.
I know, that is a very boring thing to do manually, but fortunally:
<a href="https://github.com/hail2u/node-css-mqpacker" target="_blankW">
PostCSS mqpacker
</a> comes to help us. An example on how to use it in gulp:

```js
var mqpacker = require('css-mqpacker');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');

module.exports = function() {
  return gulp.src('/styles/*.+(sass|scss)')
    .pipe(sass())
    .pipe(
      postcss([
        mqpacker({
          sort: true
        })
      ])
    )
    .pipe(gulp.dest('/styles/'));
```

You can find a complete gulp file in `gulp/tasks/sass.js`.

<br/>

## Functions
We love [Foundation](http://foundation.zurb.com) and we used it a lot. These 
functions are based on our preferred Foundation functions that we want to 
continue to use in our projects.

### remove-unit()
arguments: `$value`
- **$value**
  - required
  - type: `list`
remove the unit from a value
**Example**
```scss
$foo: remove-unit(10px); //will return 10
```

### rem-calc()
arguments: `$values`, `$base-value`
- **$values**
  - required
  - type: `list`
- **$base-value**
  - optional
  - default: [`$rem-base`](#rem-base)
  - type: `measure`

Transforms an array of pixel values (with or without `px`) in rem unit, based on 
the optional `$base-value` passed to the function.

**Examples**
```scss
.foo{
  margin: rem-calc(16 8 16 8);
  padding: rem-calc(8px);
}
```
will return:
```css
.foo{
  margin: 1rem 0.5rem 1rem 0.5rem;
  padding: 0.5rem;
}
```

### em-calc()
arguments: `$values`, `$base-value`
- **$values**
  - required
  - type: `list`
- **$base-value**
  - optional
  - default: [`$rem-base`](#rem-base)
  - type: `measure`

Transforms an array of pixel values (with or without `px`) in em unit, based on 
the optional `$base-value` passed to the function.

**Examples**

```scss
.foo{
  margin: em-calc(16 8 16 8);
  padding: em-calc(8, 8);
}
```
will return:
```css
.foo{
  margin: 1em 0.5em 1em 0.5em;
  padding: 0.5em;
}
```

### px-calc()
arguments: `$values`, `$base-value`
- **$values**
  - required
  - type: `list`
- **$base-value**
  - optional
  - default: [`$rem-base`](#rem-base)
  - type: `measure`

Transforms an array of ems or rems values (with or without `em/rem`) in pixel 
unit, based on the optional `$base-value` passed to the function.

**Example**
```scss
.foo{
  margin: px-calc(1em 0.5em 1em 0.5em);
  padding: px-calc(1rem);
}
```
will return:

```css
.foo{
  margin: 16px 8px 16px 8px;
  padding: 16px;
}
```

<br/>


## Run it
Do you want to collaborate? It's dangerous to go alone take this:

`$ npm run dev` -> Compile sources, serve the dev folder and start watchers

`$ npm run compile` -> Compile the sources for development

`$ npm run build` -> Compile for distribution

we have added unit tests recently. You can run it with Mocha. 

<br/>

## BROWSER SUPPORT
Super GiGi is built in flex. So the browser support is 
<a href="http://caniuse.com/#feat=flexbox;" target="_blank">
the same of the flexbox property</a>.

If you use the sass version, we suggest you to take a look to 
<a href="https://github.com/postcss/autoprefixer" target="_blank">
AutoPrefixer</a>, to generate the vendor prefixes.

If you have to support old browsers you can try <a href="http://flexiejs.com">.
Flexie</a>

## DISTRIBUTED UNDER THE MIT LICENSE

The MIT License (MIT)

Copyright © 2015 Objectway S.P.A

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
