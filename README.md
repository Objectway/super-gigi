<p align="center">
<img src="http://objectway.github.io/super-gigi/src/assets/images/logo.svg" alt="Logo Super Gigi" width="200" />
<br />
<img src="https://badge.fury.io/gh/objectway%2Fsuper-gigi.svg" alt="git v" />
<img src="https://badge.fury.io/js/super-gigi.svg" alt="npm version" />
<img src="https://badge.fury.io/bo/super-gigi.svg" alt="bower version" />
</p>

**Super GiGi** is a customizable Sass Grid Generator based on CSS3 Flex-box. 

It has been developed with modern web applications in mind and its first purpose is 
to make it easier to manage responsive layouts.
It is developed in Sass, but a compiled Css version is available.

## Visual Doc `WIP`
http://objectway.github.io/super-gigi/
  
## Installation
You can choose different ways to install **Super GiGi**:

- [Download the latest release](https://github.com/Objectway/super-gigi/zipball/master).
- Clone the repo: `https://github.com/Objectway/super-gigi.git`.
- Install with [Bower](http://bower.io): `bower install super-gigi -S`.
- Install with [npm](https://www.npmjs.com): `npm install super-gigi -D`.

After the download you can use the CSS compiled version by importing `[path to super-gigi]/dist/supergigi.css`.

To use the Sass version (which uses all of the options and mixins below) you have to import
in your sass file `[path to super-gigi]/dist/_main.scss`.

  
## Options
If you are using the Sass version you can personalize **Super GiGi** by
simply changing the value of its variables before importing `main.scss`. 

For the size variables, you would like to have the [`rem/em-calc()`](#rem-calc)
functions available. To achieve that remember to import the `_functions.scss` partial
before.

### $rem-base
If you want to use rem on your site, set the font-size of your `html` tag to `rem-base`. 

### $design-base
default: `$rem-base` - type: `unit`  

This is the default value for all the
[units functions](#functions), it is useful when you have a pixel based design mockup and you want to convert all of the measurements in rem / em. By default this has the same value of `$rem-base`, but in some cases you may want change it. 


### $row-width
default: `rem-calc(1920)` - type: `unit` 

This is the `max-width` of our row objects. The default value is 1920 pixels 
converted in rems via [`rem-calc()`](#rem-calc) function.

<div id="column-gutter"></div>
  
### $column-gutter
default: `rem-calc(30)` - type: `unit` 

This is the space between our columns, also known as gutter. The default value is 30 pixels converted in rems via [`rem-calc()`](#rem-calc) function. 

If you prefer, there is a `EXPERIMENTAL` option that you can use to have a responsive gutter using a map similar to the [`breakpoints`](#breakpoints) one.
```scss
$column-gutter: (
  'xxsmall': 0.5em,
  'medium': 1em,
  'xlarge': 1.5em,
);
```
Doing that, all the grid mixins will generate responsive gutter:
```scss
.foo {
  @include grid-column;
}
```
and tadà:
```css
.foo {
  box-sizing: border-box;
  display: flex;
  flex-direction: column; 
}
@media only screen and (min-width: 0em) {
  .foo {
    padding-left: 0.25em;
    padding-right: 0.25em; } }
@media only screen and (min-width: 45em) {
  .foo {
    padding-left: 0.5em;
    padding-right: 0.5em; } }
@media only screen and (min-width: 80em) {
  .foo {
    padding-left: 0.75em;
    padding-right: 0.75em; } }
```

### $grid-columns
default: `12` - type: `number` 

The number of columns used in our layout.

  
### $use-classes
default: `false` - type: `boolean` 

Set this variable to true if you want to generate static classes, like: 
`.row`, `.column` or `.large-12`. 

  
### $use-placeholders
default: `false` - type: `boolean` 

Set this variable to true if you want to generate placeholders to us like: 

```scss
.column {
  @extend %column;
  @extend %large-12;
}
```
  
### $row-name
default: `row` - type: `string` 

This option will change the name of the row object classes or placeholder.

  
### $column-name
default: `column` - type: `string` 

This option will change the name of the column object classes or placeholder. 

  
### $use-bem
default: `false` - type: `boolean` 

This option will change the format of the class names generated when `$use-class` is `true`.

  
### $bem-separator
default: `'--'` - type: `string` 

This option will change the separator between the block and the element whe using BEM naming.

  
### $grid-start
default: `left` - type: `string` - possibile values: `left` or `right`

This is the value to change if you want to develop a rtl application.

  
### $use-dry
default: `false` - type: `boolean` 

If true, all the grid will be passed by [`dry-it()`](#dry-it) mixin.

  
### $debug
default: `false` - type: `boolean` 

With big applications and semantic BEM selectors, it is difficult to understand 
what kind of properties a DOM element has. If you set this 
variable to `true`, **Super GiGi** will add a "content" property that will be 
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

### $sg-collapse
default: `false` - type: `boolean` 

By default, **Super GiGi** columns have a [`$column-gutter`](#column-gutter) made with padding. If you want to remove that gutter to all your columns, set this option to `true`
  
### $sg-use-margin `EXPERIMENTAL`
default: `false` - type: `boolean` 

It is possible to use margins as additional column-gutter between columns. This *is not mutual esclusive* to the padding -to do that, see the `$collapse` option inside the [`grid-column`](#grid-column) mixin or the [`$sg-collapse`](#sg-collapse) option-, but it will *add* another column-gutter to your column. This is the general option for all your columns. You can set this option to a single column by the [`$margin`](#gridcolumnmargin) option of the `grid-column` mixin.
  
  
### $eq-grid
default: `false` - type: `boolean` 

**Super GiGi** supports [EQJS](https://github.com/Snugug/eq.js). Turn this option to
`true` to use element queries css instead of classical mediaqueries. See the [`media-query()`](#media-query) mixin for other infos. 

<div id="breakpoints"></div>  

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

Ok, this might look a little complicated :) but we wanted to have an easily accessible setting
in one place. This is a 
<a href="http://sass-lang.com/documentation/file.SASS_REFERENCE.html#maps" target="_blank">Sass map</a>, 
and is used to define all of our mediaqueries.

The **keys** are used to define the name of our breakpoints and will be passed 
to our classes generator or to our mixins. 

As an example, the following...

```scss
$breakpoints: (sml: 0em, mdm: 40em, lrg: 60em);
```

... will generate this css:

```css
@media (min-width: 40em) {
  .mdm-3 {
    width: 25%; } }
@media (min-width: 40em) {
  .lrg-3 {
    width: 25%; }}
    
```

If you decide to change class names like in the example above, then just in the same way you have to change how you refer to breakpoints in all of your mixins:

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

  
### $use-flex
default: `true` - type: `boolean` 

**Super GiGi** is developed with CSS3 Flexbox, but there are fallback options with `float` and `display: table`. 
Set this option to `false`, to don't use the flex properties.
  

### $use-table `EXPERIMENTAL`
default: `true` - type: `boolean` 

**Super GiGi** is developed with CSS3 Flexbox, but there is a fallback in table. Set this option to `true`, to use the float properties.

### $use-float `EXPERIMENTAL`
default: `true` - type: `boolean` 

**Super GiGi** is developed with CSS3 Flexbox, but there is a fallback in float. Set this option to `true`, to use the float properties.
  
### $query-direction `EXPERIMENTAL`
default: `(min-width, max-width)` - type: `list` 

**Super GiGi** is developed mobile first, but in some cases you would like to 
develop in graceful decadency. To do this you can set 
`$query-direction: (max-width, min-width)`. The media-queries will be reverted
and all the queries will go from the largest query to the smallest one.


## Mixins
If you're using the Sass version of Super-GiGi you'll can use the following Mixins. Here you can found extended documentation for Grid and Visibility mixins too.

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
```scss
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
```css
@media only screen and (min-width: 40em) and (max-width: 44.9375em) {
  .sausage {
    content: "small only;"; } }

@media only screen and (min-width: 40em) and (max-width: 79.9375em) {
  .eggplant {
    content: "small to large;"; } }
```

You can choose between the classical 
<a href="http://www.w3.org/TR/css3-mediaqueries/" target="_blank">media query</a> 
or the JavaScript powered <a href="https://github.com/snugug/eq.js" target="_blank">element query</a>. 
You don't have to specify this setting everytime, **Super GiGi** provides a 
[global $eq-grid](#eq-grid) variable, but it might be handy to mix media end 
element queries.

### grid-space()
arguments: `$property`, `$attr`
- **$property**
  - optional
  - default: `width`
  - type: `string`
- **$attr**
  - optional
  - default: `auto`
  - type: `list`
- **$margin**
  - optional
  - default: `false`
  - type: `boolean`


When you are writing css in a grid, it's difficult to manage 
the measures sometime. `grid-space()` comes to help us in this ungrateful task!
You must declare the property you want to set (for example: 
`margin-left`) by changing the `$property` argument. 
You then have to pass how many column of the grid you want that property to take. 
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
  @include grid-space(margin-left, 1 of 2);
}
```
will return
```css
.foo {
  margin-left: 50%;
}
```
For infos about `$margin` option, see the [`margin`](#gridcolumnmargin) section.

  
### grid-row()
arguments: `$nested`, `$vertical`
- **$nested**
  - optional
  - default: `true`
  - type: `boolean`
- **$vertical** `DEPRECATED`
  - optional
  - default: `false`
  - type: `boolean`

This mixin will generate the **row element** of the grid. It's real simple, 
you may specify if the row is nested in another row (to reset the padding). 
The option `$vertical` will only add the CSS3 `flex-direction: column` property to the element, so it's deprecated. It would be removed soon.

  
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
- [**$margin**](#gridcolumnmargin) `EXPERIMENTAL`
  - optional
  - default: [`$sg-use-margin`](#sg-use-margin)
  - type: `boolean`
- [**$eq-grid**](#eq-grid)
  - optional
  - default: `false`
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
      $global: true,
      $eq-grid: false
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
**note:** you see repeated properties, because we set pull and push for 
the same element. 

<div id="gcwidthoffsetpushpull"></div>
### `$width`, `$offset`, `$push`
`$width`, `$offset`, `$push` and `$pull` have similar behaviors. They can be used in three different ways.

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
With this option you can have columns that will take all of the available space on
a given row. 
If you have one column, it will take 100% of the space, if you have two then they both will take 50% each, and so on.

Another important option is to set `$width` to `0`. **This will not set `width` to 0%** (a column must have a minimun width). But the width will be `auto`.
In this way you can have a column with the width decided from the content.

**Note** we are preparing a visual example. Stay tuned.

<div id="gcorder"></div>
###`$order`
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
### `$collapse` and `$global`
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


  
<div id="gridcolumnmargin"></div>
### `$margin`
It is possible to use margins as additional column-gutter to a column. This **is not mutual esclusive** to the padding (to do that, see the `$collapse` option or the global [`$sg-collapse`](#sg-collapse) variable). Set this parameter to `true` to **add** another column-gutter to this column.
 
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
  

### hide-from()
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
  

### show-for()
arguments: `$query`
- **$query**
  - required
  - default: `null`
  - type: `string`

In this case the element is hidden by  `display: none;` and will have 
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


### hide-for()
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
  

<div id="responsive-gutter"></div>

### responsive-gutter() `EXPERIMENTAL`
By default SuperGiGi has a fixed [`$column-gutter`](#column-gutter) that is the 
same for each breakpoint in the [`$breakpoints`](#breakpoints) variable. If you 
want to have a different gutter based on breakpoints, you can set a map as seen 
on [`$column-gutter`](#column-gutter).
If you need to manage the responsive gutter, you can use this mixin

```scss
$column-gutter: (
  'xxsmall': 0.5em,
  'medium': 1em,
  'xlarge': 1.5em,
);

.bar {
  @include responsive-gutter {
    margin-top: $column-gutter;
  };
}
```
And the CSS will be:
```css
@media only screen and (min-width: 0em) {
  .bar {
    margin-top: 0.5em
  }
}
@media only screen and (min-width: 45em) {
  .bar {
    margin-top: 1em
  }
}
@media only screen and (min-width: 80em) {
  .bar {
    margin-top: 1.5em
  }
}
```

If you are already in a mediaquery, the mixin will take only the current
breakpoint, as shown below
```scss
.foobar {
  @include media-query('medium') {
    color: red;

    @include responsive-gutter {
      left: $column-gutter;
    }
  }
}
```
will become:
```css
@media only screen and (min-width: 45em) {
  .foobar {
    color: red;
    left: 1em
  }
}
```

Obviously it will work with math operations too:
```scss
.foobar {
  @include media-query('xxsmall') {
    @include responsive-gutter {
      top: $column-gutter;
      left: ($column-gutter / 2);
      bottom: ($column-gutter * 2);
      right: ($column-gutter + 2);
    }
  }
}
```
```css
@media only screen and (min-width: 0em) {
    .foobar {
        top: 0.5em;
        left: 0.25em;
        bottom: 1em;
        right: 2.5em
    }
}
```

<div id="dry-it"></div>

### dry-it()
arguments: `$id`
- **$id**
  - required
  - type: `string`

**NOTE**: This mixin will change the order of your generated css.

One of the bad thing that we have in developing a grid without a default classes
schema is that the resulting css code will be semantic, but not dry. 
You can (and you should) use gzip to serve your css, but there will still be redundant css code.

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
We just generated the same code for two identical classes. 
Sass helps with placeholders, but still we will need to extend too many selector to
have a dry behavior. What if we can generate placeholders on fly? 
That is exactly what `dry-it()` does. To use it you just need to set [`$use-dry`](#use-dry) to `true`.

The result will be like this:

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

***IMPORTANT*** To use this option it is preferable to order your media query smaller to larger.
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


## Functions
We love [Foundation](http://foundation.zurb.com) and we've been using it a lot. These 
functions are based on our preferred Foundation functions that we want to 
continue to use in our projects.

### remove-unit()
arguments: `$value`
- **$value**
  - required
  - type: `list`

removes the unit from a value
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

## Extras

### Run it
Would you like to collaborate? Here are some useful npm tasks:

`$ npm run dev` -> Compiles sources, serves the dev folder and starts watchers

`$ npm run compile` -> Compiles the sources for development

`$ npm run build` -> Compiles for distribution

we have added unit tests recently. You can run it with Mocha. 


## BROWSER SUPPORT
Super GiGi is built in flex. So the browser support is 
<a href="http://caniuse.com/#feat=flexbox;" target="_blank">
the same of the flexbox property</a>. You can use the `$use-float` or `$use-table` setting variable to provide a fallback for the old browsers. It works fine for base case, you could use <a href="https://modernizr.com/" target="_blank">Modernizr</a> for advanced one.

If you use the sass version, we suggest you to take a look to 
<a href="https://github.com/postcss/autoprefixer" target="_blank">
AutoPrefixer</a>, to generate the vendor prefixes.

If you have to support old browsers you can try <a href="http://flexiejs.com">
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
