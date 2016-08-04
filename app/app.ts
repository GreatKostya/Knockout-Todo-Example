/// <reference path="../typings/tsd.d.ts" />

import ko = require("knockout");
import domready = require("domready");
import {HomePageViewModel} from './HomePageViewModel';

require("./app.less");
require("./components/listItem/taskItem");

var n = new HomePageViewModel(ko.utils.parseJson(window.localStorage.getItem("KoTodo")) || []);

domready(function () {
    ko.applyBindings(n);
});