import { __esDecorate, __runInitializers } from "../../../../tslib/tslib.es6.js";
import { Component, signal } from '../../../aurora/index.js';
let WindowManagerComponent = (() => {
    let _classDecorators = [Component({
            selector: 'app-window-manager',
            template: `
	<!-- Template will go here -->
	<div class="window-manager-container">
		<h2 class="my-4">Window Manager</h2>
		
		<!-- Window Creation Area -->
		<div class="card p-3 mb-4">
			<h5>Open New Window</h5>
			<div class="row g-3">
				<div class="col-md-4">
					<label class="form-label">Window Title</label>
					<input type="text" class="form-control" [(model)]="newWindowTitle" placeholder="Window Title">
				</div>
				<div class="col-md-6">
					<label class="form-label">Window Component Selector</label>
					<select class="form-select" [(model)]="selectedWindowComponentPath">
						<!-- Options will be populated dynamically or hardcoded for now -->
						<option *for="let app of availableWindowComponents" [value]="app.path">{{app.title}}</option>
					</select>
				</div>
				<div class="col-md-2">
					<button class="btn btn-primary w-100" (click)="openWindow()">Open</button>
				</div>
			</div>
		</div>

		<!-- Active Window List -->
		<div class="mt-5">
			<h4>Active Windows ({{windows.length }})</h4>
			<ul class="list-group mb-3">
				<li *for="let window of windows" class="list-group-item d-flex justify-content-between align-items-center">
					{{window.title}}
					<button class="btn btn-sm btn-outline-danger" (click)="closeWindow(window.id)">Close</button>
				</li>
			</ul>
			
			<!-- Window Display Area -->
			<div class="w-100 h-80 border p-3 bg-light">
				<h6 class="mb-3">Currently Focused Window:</h6>
				<lazy-outlet [component]="focusedWindow"></lazy-outlet>
			</div>
		</div>
	</div>`,
            styles: `
	.window-manager-container {
		padding: 20px;
		border: 1px solid #ccc;
		border-radius: 8px;
	}
	`
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var WindowManagerComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            WindowManagerComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        // Signal for managing all open windows
        windows = signal([]);
        // Signal for tracking which window is currently focused/active
        focusedWindow = signal(undefined);
        // State for creating new windows
        newWindowTitle = '';
        selectedWindowComponentPath = '';
        // Available components to select from (Simulating the router's appList)
        availableWindowComponents = [
            { path: 'directive/track-by-example.js', title: 'Track By Example', load: () => import('../directive/track-by-example.js').then(m => m.TrackByComponent) },
            { path: 'pipe-app/pipe-test.js', title: 'Pipes', load: () => import('../pipe-app/pipe-test.js').then(m => m.PipeAppComponent) },
            { path: 'two-way/shared-model.js', title: 'Editor', load: () => import('../two-way/shared-model.js').then(m => m.EditorApp) },
            { path: 'form-group/form-group.component.js', title: 'Form Group Component', load: () => import('../form-group/form-group.component.js').then(m => m.FormGroupComponent) },
        ];
        /**
         * Opens a new window by dynamically loading the specified component.
         */
        async openWindow() {
            this.selectedWindowComponentPath ||= 'directive/track-by-example.js';
            this.newWindowTitle ||= 'track by';
            if (!this.selectedWindowComponentPath || !this.newWindowTitle) {
                console.error("Please provide both a title and a component.");
                return;
            }
            try {
                // 1. Dynamically load the component module
                const componentModule = await this.availableWindowComponents.find(a => a.path === this.selectedWindowComponentPath)?.load();
                // 2. Create a unique ID and store the window state
                const newWindow = {
                    id: Date.now().toString(),
                    title: this.newWindowTitle,
                    component: componentModule
                };
                // 3. Update signals: add to list and set as focused
                this.windows.update(windows => [...windows, newWindow]);
                this.focusedWindow.set(componentModule);
            }
            catch (error) {
                console.error("Failed to load or open window:", error);
            }
        }
        /**
         * Closes a window by filtering it out of the windows signal.
         * @param id The ID of the window to close.
         */
        closeWindow(id) {
            this.windows.update(windows => windows.filter(win => win.id !== id));
            // If the closed window was the focused one, deselect it
            const currentFocusedId = this.windows.get().find(win => win.id === this.focusedWindow.get()?.id)?.id;
            if (currentFocusedId === id) {
                this.focusedWindow.set(undefined);
            }
        }
    };
    return WindowManagerComponent = _classThis;
})();
export { WindowManagerComponent };
//# sourceMappingURL=window-manager.component.js.map