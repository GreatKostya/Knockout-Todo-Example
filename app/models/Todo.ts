import ko = require("knockout");

interface ITodo {
    description:KnockoutObservable<string>;
    isDone:KnockoutObservable<boolean>;
}

class Todo implements ITodo {
    public description:KnockoutObservable<string>;
    public isDone:KnockoutObservable<boolean>;

    constructor(description:string = "", isDone?:boolean) {
        this.description = ko.observable(description);
        this.isDone = ko.observable(isDone || false);
    };
}

export {Todo, ITodo}