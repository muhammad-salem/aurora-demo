/// <reference types="@ibyar/types" />
import 'example';
import { Component } from '@ibyar/core';
// import helloTemplate from './hello.html';

@Component({
	selector: 'hello-app',
	template: `<div class="row">
	<div class="col-12 mb-3">
		<label for="name" class="form-label">Enter You Name:</label>
		<input id="name" type="text" class="form-control" [(value)]="name">
	</div>
	<div class="col-12 mb-3">
		hello {{name}}!
	</div>
</div>`,
})
export class HelloApp {
	name = 'jon';
}
