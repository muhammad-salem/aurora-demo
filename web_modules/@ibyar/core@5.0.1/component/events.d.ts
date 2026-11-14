export declare class Subscription<T> {
    private eventEmitter;
    private othersSubscription;
    constructor(eventEmitter: EventEmitter<T>);
    add(subscription: Subscription<any>): void;
    unsubscribe(): void;
}
export declare class EventEmitter<T> {
    private subscribers;
    constructor();
    emit(value?: T): void;
    subscribe(next?: any, error?: any, complete?: any): Subscription<T>;
    remove(subscription: Subscription<T>): void;
}
//# sourceMappingURL=events.d.ts.map