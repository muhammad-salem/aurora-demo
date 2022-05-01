export class Injector {
    constructor() {
        this.dependencyInjectionMap = new Map();
    }
    getInstance(contr) {
        const instance = this.constructObject(contr);
        return instance;
    }
    constructObject(constructor) {
        let currentInstance = this.dependencyInjectionMap.get(constructor);
        if (currentInstance)
            return currentInstance;
        const params = Reflect.getMetadata('design:paramtypes', constructor);
        if (params) {
            const argumentsInstances = params.map((paramter) => this.constructObject(paramter));
            currentInstance = new constructor(...argumentsInstances);
        }
        else {
            currentInstance = new constructor();
        }
        this.dependencyInjectionMap.set(constructor, currentInstance);
        return currentInstance;
    }
}
export const dependencyInjector = new Injector();
//# sourceMappingURL=injector.js.map