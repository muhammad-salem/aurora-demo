import { __decorate, __metadata } from "../../../../tslib/tslib.es6.js";
import { Component, Input, View, HostListener } from '../../../aurora/index.js';
let PersonApp = class PersonApp {
    constructor() {
        this.appVersion = '22.01.08';
        this.title = 'Testing Components';
        this.appName = 'Ibyar Aurora';
        this.name = 'alice';
        this.person1 = { name: 'alice', age: 39 };
        this.person2 = { name: 'alex', age: 46 };
        this.person3 = { name: 'delilah', age: 25 };
        this.person4 = { name: 'alice', age: 14 };
        this.people = [this.person1, this.person2, this.person3, this.person4];
        this.i = 0;
        this.fruits = [
            'mangoes',
            'oranges',
            'apples',
            'bananas',
            'cherries',
        ];
        this.selectFruit = 'bananas';
        this.asyncIterable = {
            [Symbol.asyncIterator]() {
                return {
                    i: 0,
                    next() {
                        if (this.i < 3) {
                            return Promise.resolve({ value: this.i++, done: false });
                        }
                        return Promise.resolve({ done: true });
                    }
                };
            }
        };
        this.personUtils = {
            x: 3,
            getDetails(person) {
                console.log(this);
                return `${person.name} is ${person.age} years old.`;
            }
        };
    }
    onClose(data) {
        console.log('AppRoot => person1:select', data);
    }
    onPersonEdit(data) {
        console.log('personEdit:input', data, this.view);
    }
    onPersonAge(data) {
        console.log('personEdit:person.age', data, this.view);
    }
    printPerson(person) {
        console.log('printPerson', person);
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], PersonApp.prototype, "appVersion", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PersonApp.prototype, "appName", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PersonApp.prototype, "name", void 0);
__decorate([
    View(),
    __metadata("design:type", HTMLElement)
], PersonApp.prototype, "view", void 0);
__decorate([
    HostListener('person1:select'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonApp.prototype, "onClose", null);
__decorate([
    HostListener('personEdit:input'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonApp.prototype, "onPersonEdit", null);
__decorate([
    HostListener('personEdit:person.age'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonApp.prototype, "onPersonAge", null);
PersonApp = __decorate([
    Component({
        selector: 'person-app',
        template: `
		<div *time></div>
		<template *time let-HH="hh" let-MM="mm" let-SS="ss">{{HH}}:{{MM}}:{{SS}}</template>
		<div *add-note>
			{{appVersion}}
			{{appName}}
		</div>
		<notify-user type="primary" message="A simple primary alert—check it out!"></notify-user>

		<h1 [textContent]="title"></h1>
		
		<red-note>text child in directive</red-note>

		<div class="row">
			<div class="col-4">
				{{personUtils.getDetails(person1)}}
			</div>
			<template *forOf="let {key, value} of person1 |> keyvalue">
				<div class="col-4">{{key}}: {{value}}</div>
			</template>
		</div>

		<person-edit #personEdit [(person)]="person1" (save)="printPerson($event)"></person-edit>

		<progress-bar [(value)]="person1.age" min="0" max="100"></progress-bar>

		<template					*if="person1.age < 20; else between_20_39"						>age is less than 20</template>
		<template #between_20_39	*if="person1.age > 19 && person1.age < 40; else between_40_79"	>age is between 20 and 39</template>
		<template #between_40_79	*if="person1.age > 39 && person1.age < 60; else between_80_100" >age is between 40 and 59</template>
		<template #between_80_100	*if="person1.age > 59 && person1.age < 80; else showTest" 		>age is between 60 and 79</template>
		<template #showTest																			>age is more than 80</template>

		<div class="row">
			<div class="col-3">
				<person-view #pm1 [(person)]="person1" name="dddddddd" age="34" allowed="true"
					@click="onClose('person:clicked')"></person-view>
			</div>
			<div class="col-3">
				<person-view #pm2 [(person)]="person2" name="alex2" age="19"></person-view>
			</div>
			<div class="col-3">
				<person-view #pm3 [(person)]="people[2]" name="jones" age="25"></person-view>
			</div>
			<div class="col-3">
				<person-view #pm4 person="{{person4}}" name="alex" age="29"></person-view>
			</div>
		</div>

		<hr>

		<h1>*For Of Directive</h1>
		<h5>*forOf="let user of people"</h5>
		<div class="row">
			<div class="col-3" *forOf="let user of people">
				<p>Name: <span>{{user.name}}</span></p>
				<p>Age: <span>{{user.age}}</span></p>
			</div>
		</div>

		<h1>*For In Directive</h1>
		<h5>*forIn="let key in person1"</h5>
		<div class="row">
			<div class="col-3" *forIn="let key in person1">
				<p>Key: <span>{{key}}</span></p>
				<p>Value: <span>{{person1[key]}}</span></p>
			</div>
		</div>

		<h1>*For Await OF Directive</h1>
		<h5>*forAwait="let num of asyncIterable"</h5>
		<div class="row">
			<div class="col-3" *forAwait="let num of asyncIterable">
				<p>num = <span>{{num}}</span></p>
			</div>
		</div>

		<hr>

		<h1>Switch Case Directive</h1>
		<h5>*switch="{{selectFruit}}"</h5>
		<ul class="list-group">
			<li class="list-group-item row">
				<div class="col-3" *switch="selectFruit">
					<div *case="'oranges'">Oranges</div>
					<div *case="'apples'">Apples</div>
					<div *case="'bananas'">Bananas</div>
					<div *default>Not Found</div>
				</div>
			</li>
			<li class="list-group-item row">
				<select class="form-select col-3" (change)="selectFruit = this.value">
					<option *forOf="let fruit of fruits"
						[value]="fruit"
						>{{fruit |> titlecase}}</option>
				</select>
			</li>
		</ul>
		<hr>
		`
    })
], PersonApp);
export { PersonApp };
//# person-app.js.map