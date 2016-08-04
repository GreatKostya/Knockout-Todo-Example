/// <reference path="../../../typings/tsd.d.ts" />

import ko = require("knockout");

 class listItem {
    public isDone: any;
    public listItemName:any;
    public isEdit:any = ko.observable(true);
    public dataItem:any;
    public parent: any;

    constructor(params:any) {
        this.listItemName = params.dataItem.description;
        this.isDone = params.dataItem.isDone || false;
        this.dataItem = params.dataItem;
        this.parent = params.parent;
    }

     deleteItem(dataItem, el, kek) {
        this.parent.deleteItem(this.dataItem);
    }

    public getListItemName() {
        return this.listItemName;
    }

     public setListItemName(value: string) {
         this.listItemName(value);
     }

     public itemClick() {
         this.isEdit(!this.isEdit());
     }

     public blurHandler() {
         this.itemClick();
     }
}

ko.components.register('task-item', {
    template: require('./task-item.html'),
    viewModel: {createViewModel: function(params, componentInfo) {
        return new listItem(params);
    }}
});






