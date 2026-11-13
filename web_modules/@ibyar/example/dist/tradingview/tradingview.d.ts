import { OnInit } from '@ibyar/aurora';
export declare class ScriptLoader implements OnInit {
    src: string;
    parameters: Record<string, any>;
    onInit(): void;
    private runScript;
    private run;
}
export declare class TradingViewGoldWidget {
    src: string;
    parameters: {
        symbol: string;
        interval: string;
        timezone: string;
        theme: string;
        style: string;
        locale: string;
        withdateranges: boolean;
        allow_symbol_change: boolean;
        details: boolean;
        calendar: boolean;
        studies: string[];
    };
}
//# sourceMappingURL=tradingview.d.ts.map