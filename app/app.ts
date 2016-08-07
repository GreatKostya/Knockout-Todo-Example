import ko = require("knockout");
import domready = require("domready");
import {HomePageViewModel} from './HomePageViewModel';

require("./app.less");
require("./components/taskItem/taskItem");
require("./components/bindings");

const LOCAL_STORAGE_NAME:string = "KoTodo";

var homePageViewModel:HomePageViewModel = new HomePageViewModel(ko.utils.parseJson(window.localStorage.getItem(LOCAL_STORAGE_NAME)) || []);

domready(() => {
    ko.applyBindings(homePageViewModel);
});