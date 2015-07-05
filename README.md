# OW GRID
***
**OW GRID** is a CSS3 flex based grid system. It's developed thinking about modern web application and its first purpose is to make easier to manage responsive layout. It's developed in SASS but you can use a compiled version if you prefear. 

<br/>

## Installation
For now you can pull the repo or download it via GitHub options. NPM and Bower options will come soon.

<br/>
## Options
If you are using the SASS version you can personalize those variables, simply changing the value before importing our `main.sass`.

### $use-flex
default: `true` - type: `boolean` 

**OW GRID** is developed with CSS3 Flexbox, but we also provide an untested version in float. 
Set this option to `false`, to use it.

### $rem-base
default: `16px` - type: `unit`  

This is the default font-size value for `html`. We use this value not only to set the base font-size of our application, but also as default value for **units functions**

### $row-width
default: `rem-calc(1920)` - type: `unit` 

This is the `max-width` of our row objects. The dafault value is 1920 pixels we translate it in rems via **rem-calc units functions**

### $column-gutter
default: `rem-calc(30)` - type: `unit` 

This is the space between our column. The dafault value is 30 pixels we translate it in rems via **rem-calc units functions**

### $grid-columns
default: `12` - type: `number` 

The number of columns we will use in our layout.

### $use-classes
default: `false` - type: `boolean` 

Set this variable to true if you want to generate static classes, like: `.row`, `.column` or `large-12`. 

### $row-name
default: `row` - type: `string` 

This option will change the name of the row object classes or placeholder. 
Remember that if you change this value you have to use this as base for row placeholder:

```scss
$row-name: foo;
.row {
	@extend %foo
}
```

### $column-name
default: `column` - type: `string` 

This option will change the name of the row object classes or placeholder. 
Remember that if you change this value you have to use this as base for row placeholder:

```scss
$row-name: bar;
.column {
	@extend %bar
}
```
### $grid-start
default: `left` - type: `string` //- possibile value: `left` or `right`

This is the value to change if you want to develop a rtl application.

### $use-dry
default: `true` - type: `boolean` 

In the **mixins section** you will find a `dry-it` mixin. If you don't want to use it set this variable to `false`.

### $debug
default: `false` - type: `boolean` 

With big applications and semantic BEM selectors, is difficult to understand what kind of properties we set to a determinate DOM element. If you set this variable `true`, we will generate a content property to the rules, that will be useful when we inspect the elements.

**Example:**

```css
.fooColumn {
  font-size: 30px; }
  @media only screen and (min-width: 45em) {
    .fooColumn {
      left: 8.33333%;
      right: 8.33333%;
      padding: 0 0.9375rem;
      -webkit-box-ordinal-group: 1;
      -webkit-order: 0;
          -ms-flex-order: 0;
              order: 0;
      content: "COLUMN: width : (xxsmall: 6, large: 6) | push : 1 | pull : 1 | order : 0 | global : true"; } }
```

<br/>

## Run it
You can simply import `main.sass` in your project, or you can run our tasks to deploy your custom css file. You can use:


`$ npm run dev` -> Compile sources, serve the dev folder and start watchers

`$ npm run compile` -> Compile the sources for development

`$ npm run build` -> Compile for distribution

<br/>

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
