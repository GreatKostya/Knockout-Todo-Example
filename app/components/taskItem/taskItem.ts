import ko = require("knockout");
import {Todo} from "../../models/Todo";
import {HomePageViewModel} from "../../HomePageViewModel";
import * as $ from "jquery"

class TaskItem {
    public isDone:KnockoutObservable<boolean>;
    public listItemName:KnockoutObservable<string>;
    public isEdit:KnockoutObservable<boolean> = ko.observable(false);
    public dataItem:KnockoutObservable<Todo>;
    public parent:HomePageViewModel;
    public isDataItem:KnockoutObservable<boolean> = ko.observable(true);

    constructor(params:{dataItem:Todo, parent:HomePageViewModel}) {
        this.listItemName = params.dataItem.description;
        this.isDone = params.dataItem.isDone;
        this.dataItem = ko.observable(params.dataItem);
        this.parent = params.parent;
    }

    public deleteItem():void {
        this.isDataItem(false);
        window.setTimeout(() => {
            this.parent.deleteItem(this.dataItem())
        }, 500);

    }

    public getListItemName():KnockoutObservable<string> {
        return this.listItemName;
    }

    public setListItemName(value:string):void {
        this.listItemName(value);
    }

    public itemClick():void {
        this.isEdit(true);
    }

    public blurHandler():void {
        this.isEdit(false);

    }

}

ko.components.register('task-item', {
    template: require('./task-item.html'),
    viewModel: {
        createViewModel: (params) => new TaskItem(params)
    }
});






