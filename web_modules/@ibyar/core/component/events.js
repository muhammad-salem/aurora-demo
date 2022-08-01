export class Subscription {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    add(subscription) {
        if (!this.othersSubscription) {
            this.othersSubscription = [];
        }
        this.othersSubscription.push(subscription);
    }
    unsubscribe() {
        this.eventEmitter.remove(this);
        if (this.othersSubscription) {
            this.othersSubscription.forEach((subscription) => {
                subscription.unsubscribe();
            });
        }
    }
}
export class EventEmitter {
    constructor() {
        this.subscribers = new Map();
    }
    emit(value) {
        this.subscribers.forEach((subscribe) => {
            try {
                subscribe.next(value);
            }
            catch (error) {
                try {
                    subscribe.error?.(error);
                }
                catch (error) {
                    console.error('error: handling event', error);
                }
            }
            finally {
                try {
                    subscribe.complete?.();
                }
                catch (error) {
                    console.error('error: handling event', error);
                }
            }
        });
    }
    subscribe(next, error, complete) {
        const subscription = new Subscription(this);
        this.subscribers.set(subscription, { next, error, complete });
        return subscription;
    }
    remove(subscription) {
        this.subscribers.delete(subscription);
    }
}
//# sourceMappingURL=events.js.map