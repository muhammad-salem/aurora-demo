export class InputNumberMapper {
    convert(input) {
        return +input;
    }
}
export class InputDateMapper {
    convert(input) {
        return new Date(input);
    }
}
export class InputDefaultMapper {
    convert(input) {
        return input;
    }
}
export class Mappers {
    static default = new InputDefaultMapper();
    static number = new InputNumberMapper();
    static date = new InputDateMapper();
}
//# sourceMappingURL=mappers.js.map