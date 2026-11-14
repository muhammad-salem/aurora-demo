function isEmptyInputValue(value) {
    return value == null ||
        ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
}
function hasValidLength(value) {
    return value != null && typeof value.length === 'number';
}
const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export class RequiredValidator {
    message;
    constructor(message) {
        this.message = message;
    }
    validate(control) {
        return isEmptyInputValue(control.value)
            ? {
                required: true,
                customValidityMessage: this.message
            }
            : null;
    }
    updateCustomValidityMessage(message) {
        this.message = message;
    }
}
export class RequiredTrueValidator {
    message;
    constructor(message) {
        this.message = message;
    }
    validate(control) {
        return control.value === true
            ? null
            : {
                required: true,
                customValidityMessage: this.message
            };
    }
    updateCustomValidityMessage(message) {
        this.message = message;
    }
}
export class MinimumValidator {
    min;
    message;
    constructor(min, message) {
        this.min = min;
        this.message = message;
    }
    validate(control) {
        if (isEmptyInputValue(control.value) || isEmptyInputValue(this.min)) {
            return null;
        }
        const value = parseFloat(control.value);
        return !isNaN(value) && value < this.min
            ? {
                min: { min: this.min, actual: control.value },
                customValidityMessage: this.message,
            }
            : null;
    }
    updateCustomValidityMessage(message) {
        this.message = message;
    }
}
export class MaximumValidator {
    max;
    message;
    constructor(max, message) {
        this.max = max;
        this.message = message;
    }
    validate(control) {
        if (isEmptyInputValue(control.value) || isEmptyInputValue(this.max)) {
            return null;
        }
        const value = parseFloat(control.value);
        return !isNaN(value) && value > this.max
            ? {
                max: { max: this.max, actual: control.value },
                customValidityMessage: this.message,
            }
            : null;
    }
    updateCustomValidityMessage(message) {
        this.message = message;
    }
}
export class EmailValidator {
    message;
    constructor(message) {
        this.message = message;
    }
    validate(control) {
        if (isEmptyInputValue(control.value)) {
            return null;
        }
        return EMAIL_REGEXP.test(control.value)
            ? null
            : {
                email: true,
                customValidityMessage: this.message
            };
    }
    updateCustomValidityMessage(message) {
        this.message = message;
    }
}
export class MinLengthValidator {
    minLength;
    message;
    constructor(minLength, message) {
        this.minLength = minLength;
        this.message = message;
    }
    validate(control) {
        if (isEmptyInputValue(control.value) || !hasValidLength(control.value)) {
            return null;
        }
        return control.value.length < this.minLength
            ? {
                minlength: { requiredLength: this.minLength, actualLength: control.value.length },
                customValidityMessage: this.message,
            }
            : null;
    }
    updateCustomValidityMessage(message) {
        this.message = message;
    }
}
export class MaxLengthValidator {
    maxLength;
    message;
    constructor(maxLength, message) {
        this.maxLength = maxLength;
        this.message = message;
    }
    validate(control) {
        return hasValidLength(control.value) && (control.value?.length ?? 0) > this.maxLength
            ? {
                maxlength: { requiredLength: this.maxLength, actualLength: control.value?.length ?? 0 },
                customValidityMessage: this.message,
            }
            : null;
    }
    updateCustomValidityMessage(message) {
        this.maxLength = this.maxLength;
    }
}
export class PatternValidator {
    message;
    regex;
    regexStr;
    constructor(pattern, message) {
        this.message = message;
        if (typeof pattern === 'string') {
            this.regexStr = '';
            if (pattern.charAt(0) !== '^') {
                this.regexStr += '^';
            }
            this.regexStr += pattern;
            if (pattern.charAt(pattern.length - 1) !== '$') {
                this.regexStr += '$';
            }
            this.regex = new RegExp(this.regexStr);
        }
        else {
            this.regexStr = pattern.toString();
            this.regex = pattern;
        }
    }
    validate(control) {
        if (isEmptyInputValue(control.value)) {
            return null;
        }
        const value = control.value;
        return this.regex.test(value)
            ? null
            : {
                pattern: { requiredPattern: this.regexStr, actualValue: value },
                customValidityMessage: this.message,
            };
    }
    updateCustomValidityMessage(message) {
        this.message = message;
    }
}
export class Validators {
    static required(customValidityMessage) {
        return new RequiredValidator(customValidityMessage);
    }
    static requiredTrue(customValidityMessage) {
        return new RequiredTrueValidator(customValidityMessage);
    }
    static min(min, customValidityMessage) {
        return new MinimumValidator(min, customValidityMessage);
    }
    static max(max, customValidityMessage) {
        return new MaximumValidator(max, customValidityMessage);
    }
    static email(customValidityMessage) {
        return new EmailValidator(customValidityMessage);
    }
    static minLength(minLength, customValidityMessage) {
        return new MinLengthValidator(minLength, customValidityMessage);
    }
    static maxLength(maxLength, customValidityMessage) {
        return new MaxLengthValidator(maxLength, customValidityMessage);
    }
    static pattern(pattern, customValidityMessage) {
        if (!pattern) {
            return null;
        }
        return new PatternValidator(pattern, customValidityMessage);
    }
}
//# sourceMappingURL=validators.js.map