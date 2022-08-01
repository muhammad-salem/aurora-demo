import { createLiveAttribute, DomStructuralDirectiveNode, DomElementNode, DomFragmentNode, isLiveTextContent } from '../../elements/index.js';
import { expressionVisitor, Identifier, JavaScriptParser, MemberExpression } from '../../expressions/index.js';
import { OneWayAssignmentExpression, TwoWayAssignmentExpression } from '../binding/binding.expressions.js';
import { DirectiveExpressionParser } from '../directive/parser.js';
import { ClassRegistryProvider } from '../providers/provider.js';
const ThisTextContent = JavaScriptParser.parseScript('this.textContent');
function parseLiveText(text) {
    const textExpression = JavaScriptParser.parseScript(text.value);
    text.expression = new OneWayAssignmentExpression(ThisTextContent, textExpression);
    text.pipelineNames = getPipelineNames(textExpression);
}
function convertToMemberAccessStyle(source) {
    const dashSplits = Array.isArray(source) ? source : source.split('-');
    if (dashSplits.length === 1) {
        return source;
    }
    return dashSplits[0] + dashSplits.splice(1).map(s => (s[0].toUpperCase() + s.substring(1))).join('');
}
/**
 * warp js code with `()` if necessary
 *
 * `{name: 'alex'}` will be `({name: 'alex'})`
 *
 * @param params
 */
function checkAndValidateObjectSyntax(source) {
    if (source.startsWith('{')) {
        return `(${source})`;
    }
    return source;
}
function parseLiveAttribute(attr) {
    const elementSource = `this.${convertToMemberAccessStyle(attr.name)}`;
    const elementExpression = JavaScriptParser.parseScript(elementSource);
    const modelExpression = JavaScriptParser.parseScript(checkAndValidateObjectSyntax(attr.value));
    if (elementExpression instanceof MemberExpression
        && (modelExpression instanceof MemberExpression || modelExpression instanceof Identifier)) {
        attr.expression = new TwoWayAssignmentExpression(elementExpression, modelExpression);
    }
    else {
        console.error(`${attr.name}="${attr.value}"" is not a valid MemberExpression or Identifier 'x.y.z'`);
    }
}
function getPipelineNames(modelExpression) {
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
function parseLiveAttributeUpdateElement(attr) {
    const elementSource = `this.${convertToMemberAccessStyle(attr.name)}`;
    const elementExpression = JavaScriptParser.parseScript(elementSource);
    const modelExpression = JavaScriptParser.parseScript(checkAndValidateObjectSyntax(attr.value));
    if (elementExpression instanceof MemberExpression) {
        attr.expression = new OneWayAssignmentExpression(elementExpression, modelExpression);
    }
    else {
        console.error(`${attr.name} is not a valid MemberExpression 'x.y.z'`);
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
}
function parseBaseNode(base) {
    base.inputs?.forEach(parseLiveAttributeUpdateElement);
    base.outputs?.forEach(parseOutputExpression);
    base.twoWayBinding?.forEach(parseLiveAttribute);
    base.templateAttrs?.forEach(parseLiveAttributeUpdateElement);
    base.attributeDirectives?.forEach(parseAttributeDirectives);
}
function parseChild(child) {
    if (child instanceof DomElementNode) {
        // DomElementNode
        parseBaseNode(child);
        parseDomParentNode(child);
    }
    else if (child instanceof DomStructuralDirectiveNode) {
        let expressions = [];
        child.templateExpressions = expressions;
        if (child.value) {
            // use shorthand syntax, possible mixed with input and outputs
            const info = DirectiveExpressionParser.parse(child.name.substring(1), child.value);
            expressions.push(...info.templateExpressions.map(template => JavaScriptParser.parseScript(template)));
            // <div let-i="index">{{item}}</div>
            searchForLetAttributes(child, expressions);
            if (info.directiveInputs.size > 0) {
                const ref = ClassRegistryProvider.getDirectiveRef(child.name);
                if (!ref?.inputs?.length) {
                    return;
                }
                child.inputs ?? (child.inputs = []);
                info.directiveInputs.forEach((expression, input) => {
                    const modelName = ref?.inputs.find(i => i.viewAttribute === input)?.modelProperty ?? input;
                    const attr = createLiveAttribute(modelName, expression);
                    (child.inputs ?? (child.inputs = [])).push(attr);
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
    }
    else if (isLiveTextContent(child)) {
        parseLiveText(child);
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
//# sourceMappingURL=expression.js.map