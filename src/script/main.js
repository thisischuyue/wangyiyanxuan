import "jquery";

import '../stylesheets/index.css';
import '../stylesheets/details.css';
import '../stylesheets/cartlist.css';
import '../stylesheets/login.css';
import '../stylesheets/registry.css';

const page = $('script').attr("page");
console.log(page)
import {
    Render
} from './render.js';

import {
    Details,
    Fangdajing
} from './details.js';


import {
    Cartlist
} from './cartlist.js';

import {
    Registry
} from './registry.js';

import {
    Login
} from './login.js';


if (page == 'index') {
    new Render().init();
}
if (page == 'details') {
    new Details().init();
    new Fangdajing().init();
}
if (page == 'cartlist') {
    new Cartlist().init();
}
if (page == 'registry') {
    new Registry().init();
}
if (page == 'login') {
    new Login().init();
}






