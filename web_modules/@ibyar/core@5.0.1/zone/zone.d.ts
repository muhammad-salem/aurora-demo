import { EventEmitter } from '../component/events.js';
import { ZoneType } from './bootstrap.js';
export interface AuroraZone {
    readonly onTry: EventEmitter<void>;
    readonly onCatch: EventEmitter<void>;
    readonly onFinal: EventEmitter<void>;
    readonly onEmpty: EventEmitter<void>;
    fork(type?: ZoneType): AuroraZone;
    run<T>(callback: (...args: any[]) => T, applyThis?: any, applyArgs?: any[] | undefined): T;
    runTask<T>(callback: (...args: any[]) => T, applyThis?: any, applyArgs?: any[] | undefined, name?: string | undefined): T;
    runGuarded<T>(callback: (...args: any[]) => T, applyThis?: any, applyArgs?: any[] | undefined): T;
    runOutsideAurora<T>(callback: (...args: any[]) => T): T;
}
export declare abstract class AbstractAuroraZone implements AuroraZone {
    readonly onTry: EventEmitter<void>;
    readonly onCatch: EventEmitter<void>;
    readonly onFinal: EventEmitter<void>;
    readonly onEmpty: EventEmitter<void>;
    protected id: number;
    constructor();
    abstract fork(type?: ZoneType): AuroraZone;
    abstract run<T>(callback: (...args: any[]) => T, applyThis?: any, applyArgs?: any[] | undefined): T;
    abstract runTask<T>(callback: (...args: any[]) => T, applyThis?: any, applyArgs?: any[] | undefined, name?: string | undefined): T;
    abstract runGuarded<T>(callback: (...args: any[]) => T, applyThis?: any, applyArgs?: any[] | undefined): T;
    abstract runOutsideAurora<T>(callback: (...args: any[]) => T): T;
}
export declare class AuroraZone extends AbstractAuroraZone {
    static isInAuroraZone(): boolean;
    static assertInAuroraZone(): void;
    static assertNotInAuroraZone(): void;
    constructor(parent?: AuroraZone);
}
export declare class ManualAuroraZone extends AbstractAuroraZone {
    constructor(parent?: AuroraZone);
    fork(type?: ZoneType): AuroraZone;
    private runCallback;
    run<T>(callback: (...args: any[]) => T, applyThis?: any, applyArgs?: any[] | undefined): T;
    runTask<T>(callback: (...args: any[]) => T, applyThis?: any, applyArgs?: any[] | undefined, name?: string | undefined): T;
    runGuarded<T>(callback: (...args: any[]) => T, applyThis?: any, applyArgs?: any[] | undefined): T;
    runOutsideAurora<T>(callback: (...args: any[]) => T): T;
}
export declare class ProxyAuroraZone extends AbstractAuroraZone {
    private _cdPromise?;
    constructor(parent?: AuroraZone);
    fork(type?: ZoneType): AuroraZone;
    private runCallback;
    run<T>(callback: (...args: any[]) => T, applyThis?: any, applyArgs?: any[] | undefined): T;
    runTask<T>(callback: (...args: any[]) => T, applyThis?: any, applyArgs?: any[] | undefined, name?: string | undefined): T;
    runGuarded<T>(callback: (...args: any[]) => T, applyThis?: any, applyArgs?: any[] | undefined): T;
    runOutsideAurora<T>(callback: (...args: any[]) => T): T;
    scheduleChangesDetection(): void;
}
//# sourceMappingURL=zone.d.ts.map