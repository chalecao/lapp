# lapp = little fast app

[![NPM version](http://img.shields.io/npm/v/generator-javascript.svg?style=flat-square)](https://www.npmjs.com/package/generator-javascript)
[![NPM downloads](http://img.shields.io/npm/dm/generator-javascript.svg?style=flat-square)](https://www.npmjs.com/package/generator-javascript)

> lapp = little fast app, lapp mainly focus on ui component which can be easily developed with OOP or functional programing! pure MVVM framework. (3.2kb gzip)

> [ES2015](https://babeljs.io/docs/learn-es2015/)+ via [Babel](https://babeljs.io/)


### Features

&nbsp; &nbsp; ✓ support functional programming componnent<br>
&nbsp; &nbsp; ✓ support class oop(object oriented programming)  componnent<br>
&nbsp; &nbsp; ✓ Author your code, including tests, in [ES2015](https://babeljs.io/docs/learn-es2015/)+ via [Babel](http://babeljs.io/)<br>
&nbsp; &nbsp; ✓ Publish as CommonJS, ES2015 and UMD via [Rollup](http://rollupjs.org/)

### Documentation
see demo folder example.

See also [fed123.com](https://www.fed123.com/)


### Learn ES6

:mortar_board: &nbsp; **[ES6 Training Course](https://es6.io/friend/konstantin)** by Wes Bos<br>
:green_book: &nbsp; **[You Don't Know JS: ES6 & Beyond](http://amzn.to/2bzvV51)** by Kyle Simpson (Dec, 2015)<br>


### changelog
#### 2018.05.2
1. add onShow callback, week life circle control, because you can control it in you view.
2. add key when use subview. <myCard key="aa" > , if key property no change ,then don't update this subview. 

#### 2018.04.31
1. up to my project experience, i delete APIs that no need, to make lapp as small as possiable.
2. for curry function bind in the view, you should add 'forceUpdate' attribute on the element, to make sure update the function when update dom. if not, may cause the function didn't update.

### License

Copyright © 2017-2018 chalecao, LLC. This source code is licensed under the MIT license found in
the [LICENSE.txt](https://github.com/chalecao/lapp/blob/master/LICENSE.txt) file.
The documentation to the project is licensed under the [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
license.


---
Made with ♥ by ChaleCao
