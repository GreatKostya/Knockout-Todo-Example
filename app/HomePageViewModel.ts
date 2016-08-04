import {Todo, ITodo} from './models/Todo';
import ko = require("knockout");

class HomePageViewModel {

    isReverse:KnockoutObservable<boolean>;
    toggleCheckAllItem:KnockoutObservable<boolean>;
    descriptionOfNewTask:KnockoutObservable<string> = ko.observable("");
    tasks:KnockoutObservableArray<ITodo> = ko.observableArray<ITodo>();
    allSelected:KnockoutObservable<boolean>;
    displayTasks:KnockoutComputed<ITodo[]>;
    filterOptions:string[] = ["all", "active", "completed"];
    filterOption:KnockoutObservable<string>;

    constructor(todos) {
        this.filterOption = ko.observable(this.filterOptions[0]);
        this.isReverse = ko.observable(true);
        this.toggleCheckAllItem = ko.observable(!this.remainingTasks())
        this.tasks = ko.observableArray<ITodo>(todos.map((item)=> {
            var todoInstance = new Todo(item.description, item.isDone);
            console.log("todoInstance - " + typeof todoInstance);
            console.log(todoInstance);
            return todoInstance;
        }));

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
                this.tasks().forEach((task)=> {
                    task.isDone(value)
                })
            },
            read: () => {
                return !this.remainingTasks();
            }
        });
    };

    filterList(array) {
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

    deleteSelected() {
        this.tasks((this.tasks().filter((item, i)=> {

            return item.isDone() !== true;
        })));
    }

    filterByProgress(arr, flag) {
        var res = arr.filter(function (item) {

            return item.isDone() !== flag;
        });

        return res;
    }

    getOnlyActiveTasks(arr) {
        return this.filterByProgress(arr, true);
    }

    getOnlyCompletedTasks(arr) {
        return this.filterByProgress(arr, false);
    }

    deleteItem(item) {
        this.tasks.remove(item);
    }

    add() {
        if (this.descriptionOfNewTask) {
            this.tasks.push(new Todo(this.descriptionOfNewTask()));
            this.descriptionOfNewTask("");
        }
    }

    completedCount() {
        return this.tasks().reduce((sum, currentItem, index, arr)=> {
            return currentItem.isDone() ? ++sum : sum;
        }, 0);
    }

    remainingTasks() {
        var amount = this.tasks().length - this.completedCount();
        return amount;
    }

    getTasks() {
        var arr = this.tasks().slice(0);
        if (this.isReverse()) {
            arr.reverse();
        }
        return arr;
    }
}

export {HomePageViewModel}