import {Todo, ITodo} from './models/Todo';
import ko = require("knockout");

class HomePageViewModel {

    public isReverse:KnockoutObservable<boolean>;
    public toggleCheckAllItem:KnockoutObservable<boolean>;
    public descriptionOfNewTask:KnockoutObservable<string> = ko.observable("");
    public tasks:KnockoutObservableArray<ITodo> = ko.observableArray<ITodo>();
    public allSelected:KnockoutObservable<boolean>;
    public displayTasks:KnockoutComputed<ITodo[]>;
    public filterOptions:string[] = ["all", "active", "completed"];
    public filterOption:KnockoutObservable<string>;

    constructor(todos:Array<{description:string, isDone:boolean}>) {
        this.filterOption = ko.observable(this.filterOptions[0]);
        this.isReverse = ko.observable(true);
        this.toggleCheckAllItem = ko.observable(!this.remainingTasks());
        this.tasks = ko.observableArray<ITodo>(todos.map((item)=> new Todo(item.description, item.isDone)));

        this.displayTasks = ko.computed(()=> {
            var arr = this.tasks().slice(0);
            if (this.isReverse()) {
                arr.reverse();
            }
            arr = this.filterList(arr);
            return arr;
        });

        ko.computed(() => {
            window.localStorage.setItem("KoTodo", ko.toJSON(this.tasks));
        }).extend({
            rateLimit: {timeout: 500, method: 'notifyWhenChangesStop'}
        });

        this.allSelected = ko.computed({
            write: (value) => {
                this.tasks().forEach((task) => {
                    task.isDone(value)
                })
            },
            read: () => !this.remainingTasks()
        });
    };

    public filterList(array: Todo[]) {
        var res = array.splice(0);
        switch (this.filterOption()) {
            case "all":
                break;
            case "active":
                res = this.getOnlyActiveTasks(res);
                break;
            case "completed":
                res = this.getOnlyCompletedTasks(res);
                break;
        }

        return res;
    }

    public deleteSelected():void {
        this.tasks((this.tasks().filter((item)=> item.isDone() !== true)));
    }

    private filterByProgress(arr:Todo[], flag:boolean):Todo[] {
        return arr.filter((item) => item.isDone() !== flag);
    }

    public getOnlyActiveTasks(arr: Todo[]):Todo[] {
        return this.filterByProgress(arr, true);
    }

    public getOnlyCompletedTasks(arr: Todo[]):Todo[] {
        return this.filterByProgress(arr, false);
    }

    public deleteItem(item: Todo):void {
        this.tasks.remove(item);
    }

    public add():void {
        if (this.descriptionOfNewTask) {
            this.tasks.push(new Todo(this.descriptionOfNewTask()));
            this.descriptionOfNewTask("");
        }
    }

    public completedCount():number {
        return this.tasks().reduce((sum, currentItem) => currentItem.isDone() ? ++sum : sum, 0);
    }

    public remainingTasks():number {
        return this.tasks().length - this.completedCount();
    }

    public getTasks():Todo[] {
        var arr = this.tasks().slice(0);
        if (this.isReverse()) {
            arr.reverse();
        }
        return arr;
    }
}

export {HomePageViewModel}