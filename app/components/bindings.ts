import ko = require("knockout");
import * as $ from 'jquery';


var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

function keyhandlerBindingFactory(keyCode) {
    return {
        init: function (element, valueAccessor, allBindingsAccessor, data, bindingContext) {
            var wrappedHandler,
                newValueAccessor;

            wrappedHandler = function (data, event) {
                if (event.keyCode === keyCode) {
                    valueAccessor().call(this, data, event);
                }
            };

            newValueAccessor = function () {
                return {
                    keyup: wrappedHandler
                };
            };

            ko.bindingHandlers.event.init(element, newValueAccessor, allBindingsAccessor, data, bindingContext);
        }
    };
}

ko.bindingHandlers["enterKey"] = keyhandlerBindingFactory(ENTER_KEY);
ko.bindingHandlers["escapeKey"] = keyhandlerBindingFactory(ESCAPE_KEY);

// Todo research this code
ko.bindingHandlers["selectAndFocus"] = {
    init: function (element, valueAccessor, allBindingsAccessor, bindingContext) {
        ko.bindingHandlers.hasFocus.init(element, valueAccessor, allBindingsAccessor, bindingContext);
        ko.utils.registerEventHandler(element, 'focus', function () {
            element.focus();
        });
    },
    update: function (element, valueAccessor) {
        setTimeout(function () {
            ko.bindingHandlers.hasFocus.update(element, valueAccessor);
        }, 0);
    }
};