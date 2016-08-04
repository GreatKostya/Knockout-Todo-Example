import ko = require("knockout");

interface ITodo {
    description : KnockoutObservable<string>;
    isDone: KnockoutObservable<boolean>;
}

class Todo implements ITodo{
    description: KnockoutObservable<string>;
    isDone: KnockoutObservable<boolean>;
    constructor(title:string, isDone?:boolean) {
        this.description = ko.observable(title || "");
        this.isDone = ko.observable(isDone || false);
    };
}

export {Todo, ITodo}