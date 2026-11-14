import { createLiveAttribute, DomStructuralDirectiveNode, DomElementNode, DomFragmentNode, isLiveTextContent, isLocalTemplateVariables } from '../../elements@5.0.1/node.js';
import { Identifier, MemberExpression, JavaScriptParser, expressionVisitor } from '../../expressions@5.0.1/index.js';
import { OneWayAssignmentExpression, TwoWayAssignmentExpression } from '../binding/binding.expressions.js';
import { DirectiveExpressionParser } from '../directive/parser.js';
import { classRegistryProvider } from '../providers/provider.js';
const ThisTextContent = JavaScriptParser.parseScript('this.textContent');
function parseLiveText(text) {
    const textExpression = JavaScriptParser.parseScript(text.value);
    text.expression = new OneWayAssignmentExpression(ThisTextContent, textExpression);
    text.pipelineNames = getPipelineNames(textExpression);
}
function parseLocalTemplateVariables(local) {
    const expression = JavaScriptParser.parseScript(`let ${local.declarations}`);
    local.variables = expression.getDeclarations().map(declaration => {
        const expression = new OneWayAssignmentExpression(declaration.getId(), declaration.getInit());
        const pipelineNames = getPipelineNames(expression.getRight());
        return { expression, pipelineNames };
    });
}
/**
 * user-name ==> userName
 *
 * @param source
 * @returns
 */
function convertToMemberAccessStyle(source) {
    const dashSplits = Array.isArray(source) ? source : source.split('-');
    if (dashSplits.length === 1) {
        return source;
    }
    return dashSplits[0] + dashSplits.splice(1).map(s => (s[0].toUpperCase() + s.substring(1))).join('');
}
function getAccessNotation(property) {
    if (property.includes('-')) {
        return [`['`, property, `']`];
    }
    else if (Number.isInteger(property.at(0))) {
        return ['[', property, ']'];
    }
    return ['.', property];
}
/**
 * user.tel-number ==> user['tel-number']
 *
 * @param source
 * @returns
 */
function escapeMemberExpression(source) {
    const dashSplits = Array.isArray(source) ? source : source.split('.');
    return dashSplits.flatMap(property => getAccessNotation(property)).join('');
}
/**
 * warp js code with `()` if necessary
 *
 * `{name: 'alex'}` will be `({name: 'alex'})`
 *
 * @param params
 */
function checkAndValidateObjectSyntax(source) {
    if (source.trimStart().startsWith('{')) {
        return `(${source})`;
    }
    return source;
}
function parseLiveAttribute(attr) {
    const elementSource = `this${escapeMemberExpression(attr.name)}`;
    const elementExpression = JavaScriptParser.parseScript(elementSource);
    const modelExpression = JavaScriptParser.parseScript(checkAndValidateObjectSyntax(attr.value));
    if (elementExpression instanceof MemberExpression
        && (modelExpression instanceof MemberExpression || modelExpression instanceof Identifier)) {
        attr.expression = new TwoWayAssignmentExpression(elementExpression, modelExpression);
    }
    else {
        console.error(`[(${attr.name})]="${attr.value}" is not a valid MemberExpression or Identifier 'x.y.z'`);
    }
}
export function getPipelineNames(modelExpression) {
    const pipelineNames = [];
    expressionVisitor.visit(modelExpression, (expression, type, control) => {
        if (type === 'PipelineExpression') {
            const pipelineName = expression.getRight();
            if (pipelineName instanceof Identifier) {
                pipelineNames.push(pipelineName.getName());
            }
        }
    });
    return pipelineNames.length ? pipelineNames : undefined;
}
function parseAssignmentAttributeUpdateElement(attr) {
    let left = attr.name;
    let right = attr.value?.toString();
    if (right?.startsWith('javascript:')) {
        right = right.substring(11);
    }
    if (attr.name.startsWith('data-')) {
        left = `this.dataset.${convertToMemberAccessStyle(attr.name.substring(5))}`;
    }
    else {
        left = `this${escapeMemberExpression(attr.name)}`;
        const elements = left.split(/\.|\[|]/).filter(s => !!s);
        if (elements.length > 2) {
            left = `this${escapeMemberExpression(elements[1])}`;
            right = `({${elements[2]}: ${right}})`;
        }
    }
    right = checkAndValidateObjectSyntax(right);
    const assignment = `${left} = '${right}'`;
    attr.expression = JavaScriptParser.parseScript(assignment);
}
function parseLiveAttributeUpdateElement(attr) {
    let left = attr.name;
    let right = attr.value;
    if (attr.name.startsWith('data-')) {
        left = `this.dataset.${convertToMemberAccessStyle(attr.name.substring(5))}`;
    }
    else {
        left = `this${escapeMemberExpression(attr.name)}`;
        const elements = left.split(/\.|\[|]/).filter(s => !!s);
        if (elements.length > 2) {
            left = `this${escapeMemberExpression(elements[1])}`;
            right = `({${elements[2]}: ${right}})`;
        }
    }
    const elementExpression = JavaScriptParser.parseScript(left);
    const modelExpression = JavaScriptParser.parseScript(checkAndValidateObjectSyntax(right));
    if (elementExpression instanceof MemberExpression) {
        attr.expression = new OneWayAssignmentExpression(elementExpression, modelExpression);
    }
    else {
        console.error(`[${attr.name}]="${attr.value}" is not a valid MemberExpression 'x.y.z'`);
    }
    attr.pipelineNames = getPipelineNames(modelExpression);
}
function parseOutputExpression(attr) {
    attr.expression = JavaScriptParser.parseScript(attr.value);
}
function parseAttributeDirectives(directive) {
    directive.inputs?.forEach(parseLiveAttributeUpdateElement);
    directive.outputs?.forEach(parseOutputExpression);
    directive.twoWayBinding?.forEach(parseLiveAttribute);
    directive.templateAttrs?.forEach(parseLiveAttributeUpdateElement);
    directive.attributes?.forEach(parseAssignmentAttributeUpdateElement);
}
function parseBaseNode(base) {
    base.inputs?.forEach(parseLiveAttributeUpdateElement);
    base.outputs?.forEach(parseOutputExpression);
    base.twoWayBinding?.forEach(parseLiveAttribute);
    base.templateAttrs?.forEach(parseLiveAttributeUpdateElement);
    base.attributes?.forEach(parseAssignmentAttributeUpdateElement);
    base.attributeDirectives?.forEach(parseAttributeDirectives);
}
function parseChild(child) {
    if (child instanceof DomElementNode) {
        // DomElementNode
        parseBaseNode(child);
        parseDomParentNode(child);
    }
    else if (child instanceof DomStructuralDirectiveNode) {
        const expressions = [];
        child.templateExpressions = expressions;
        if (child.value) {
            // use shorthand syntax, possible mixed with input and outputs
            const info = DirectiveExpressionParser.parse(child.name.substring(1), child.value);
            expressions.push(...info.templateExpressions.map(template => JavaScriptParser.parseScript(template)));
            // <div let-i="index">{{item}}</div>
            searchForLetAttributes(child, expressions);
            if (info.directiveInputs.size > 0) {
                const ref = classRegistryProvider.getDirectiveRef(child.name);
                if (!ref?.inputs?.length) {
                    return;
                }
                child.inputs ??= [];
                info.directiveInputs.forEach((expression, input) => {
                    const modelName = ref?.inputs.find(i => i.viewAttribute === input)?.modelProperty ?? input;
                    const attr = createLiveAttribute(modelName, expression);
                    (child.inputs ??= []).push(attr);
                });
            }
        }
        else {
            searchForLetAttributes(child, expressions);
        }
        // DomDirectiveNode
        // in case if add input/output support need to handle that here.
        parseChild(child.node);
        parseBaseNode(child);
        child.successors?.forEach(parseChild);
    }
    else if (isLiveTextContent(child)) {
        parseLiveText(child);
    }
    else if (isLocalTemplateVariables(child)) {
        parseLocalTemplateVariables(child);
    }
    else if (child instanceof DomFragmentNode) {
        parseDomParentNode(child);
    }
}
function searchForLetAttributes(child, expressions) {
    const templateExpressionsFromInput = child.attributes?.filter(attr => attr.name.startsWith('let-'));
    templateExpressionsFromInput?.forEach(attr => {
        child.attributes.splice(child.attributes.indexOf(attr), 1);
        const attrName = convertToMemberAccessStyle(attr.name.split('-').slice(1));
        const expression = `let ${attrName} = ${(typeof attr.value == 'string') ? attr.value : '$implicit'}`;
        expressions.push(JavaScriptParser.parseScript(expression));
    });
}
function parseDomParentNode(parent) {
    parent.children?.forEach(parseChild);
}
export function buildExpressionNodes(node) {
    if (node instanceof DomFragmentNode) {
        parseDomParentNode(node);
    }
    else {
        parseChild(node);
    }
}
/**
 * function to skip node checking
 * @param modelClass
 */
export function provideDirective(modelClass) {
    classRegistryProvider.registerDirective(modelClass);
}
export function deleteDirective(selector) {
    classRegistryProvider.deleteDirective(selector);
}
//# sourceMappingURL=expression.js.map