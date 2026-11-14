export interface OnChanges {
    onChanges(): void;
}
export declare function isOnChanges(object: any): object is OnChanges;
export interface OnInit {
    onInit(): void;
}
export declare function isOnInit(object: any): object is OnInit;
export interface DoCheck {
    doCheck(): void;
}
export declare function isDoCheck(object: any): object is DoCheck;
export interface AfterContentInit {
    afterContentInit(): void;
}
export declare function isAfterContentInit(object: any): object is AfterContentInit;
export interface AfterContentChecked {
    afterContentChecked(): void;
}
export declare function isAfterContentChecked(object: any): object is AfterContentChecked;
export interface AfterViewInit {
    afterViewInit(): void;
}
export declare function isAfterViewInit(object: any): object is AfterViewInit;
export interface AfterViewChecked {
    afterViewChecked(): void;
}
export declare function isAfterViewChecked(object: any): object is AfterViewChecked;
/**
 * Called each time the element is moved to a different place in the DOM via Element.moveBefore().
 */
export interface OnViewMove {
    /**
     * Called each time the element is moved to a different place in the DOM via Element.moveBefore().
     */
    onViewMove(): void;
}
export declare function isOnViewMove(object: any): object is OnViewMove;
/**
 * Called each time the element is moved to a new document.
 */
export interface OnViewAdopted {
    /**
     * Called each time the element is moved to a new document.
     */
    onViewAdopted(): void;
}
export declare function isOnViewAdopted(object: any): object is OnViewAdopted;
export interface OnDestroy {
    onDestroy(): void;
}
export declare function isOnDestroy(object: any): object is OnDestroy;
//# sourceMappingURL=lifecycle.d.ts.map