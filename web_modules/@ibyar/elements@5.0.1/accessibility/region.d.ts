export type AriaBusy = boolean;
export type AriaLive = 'assertive' | 'off' | 'polite';
export type AriaRelevant = 'additions' | 'removals' | 'text' | 'additions text' | 'all';
export type AriaAtomic = boolean;
export interface LiveRegionModel {
    ariaBusy: AriaBusy;
    ariaLive: AriaLive;
    ariaRelevant: AriaRelevant;
    ariaAtomic: AriaAtomic;
}
export declare const LiveRegionAttributes: string[];
export declare const LiveRegionAttributesMap: {
    'aria-busy': string;
    'aria-live': string;
    'aria-relevant': string;
    'aria-atomic': string;
};
//# sourceMappingURL=region.d.ts.map