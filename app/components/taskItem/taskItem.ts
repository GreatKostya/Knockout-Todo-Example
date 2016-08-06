import ko = require("knockout");
import {Todo} from "../../models/Todo";
import {HomePageViewModel} from "../../HomePageViewModel";

class TaskItem {
    public isDone:KnockoutObservable<boolean>;
    public listItemName:KnockoutObservable<string>;
    public isEdit:KnockoutObservable<boolean> = ko.observable(true);
    public dataItem:Todo;
    public parent:HomePageViewModel;

    constructor(params:{dataItem:Todo, parent:HomePageViewModel}) {
        this.listItemName = params.dataItem.description;
        this.isDone = params.dataItem.isDone;
        this.dataItem = params.dataItem;
        this.parent = params.parent;
    }

    public deleteItem():void {
        this.parent.deleteItem(this.dataItem);
    }

    public getListItemName():KnockoutObservable<string> {
        return this.listItemName;
    }

    public setListItemName(value:string):void {
        this.listItemName(value);
    }

    public itemClick():void {
        this.isEdit(!this.isEdit());
    }

    public blurHandler():void {
        this.itemClick();
    }
}

ko.components.register('task-item', {
    template: require('./task-item.html'),
    viewModel: {
        createViewModel: (params) => new TaskItem(params)
    }
});






