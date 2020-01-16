import "jquery";

import '../stylesheets/index.css';
import '../stylesheets/details.css';
import '../stylesheets/cartlist.css';
// import '../stylesheets/login.css';
// import '../stylesheets/registry.css';
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



new Render().init();
new Details().init();
new Fangdajing().init();
new Cartlist().init();
new Registry().init();
new Login().init();









