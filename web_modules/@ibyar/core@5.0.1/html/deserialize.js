import { DomStructuralDirectiveNode, DomElementNode, DomFragmentNode, isLiveTextContent, LocalTemplateVariables } from '../../elements@5.0.1/index.js';
import { deserialize } from '../../expressions@5.0.1/index.js';
import { getPipelineNames } from './expression.js';
function deserializeLiveText(text) {
    if (text.expression) {
        text.expression = deserialize(text.expression);
        text.pipelineNames = getPipelineNames(text.expression.getRight());
    }
}
function deserializeLocalTemplateVariables(local) {
    local.variables?.forEach(variable => {
        variable.expression = deserialize(variable.expression);
        variable.pipelineNames = getPipelineNames(variable.expression.getRight());
    });
}
function deserializeLiveAttribute(attr) {
    if (attr.expression) {
        attr.expression = deserialize(attr.expression);
    }
}
function deserializeAssignmentAttributeUpdateElement(attr) {
    if (attr.expression) {
        attr.expression = deserialize(attr.expression);
    }
}
function deserializeLiveAttributeUpdateElement(attr) {
    if (attr.expression) {
        attr.expression = deserialize(attr.expression);
        attr.pipelineNames = getPipelineNames(attr.expression.getRight());
    }
}
function deserializeOutputExpression(attr) {
    if (attr.expression) {
        attr.expression = deserialize(attr.expression);
    }
}
function deserializeAttributeDirectives(directive) {
    directive.inputs?.forEach(deserializeLiveAttributeUpdateElement);
    directive.outputs?.forEach(deserializeOutputExpression);
    directive.twoWayBinding?.forEach(deserializeLiveAttribute);
    directive.templateAttrs?.forEach(deserializeLiveAttributeUpdateElement);
    directive.attributes?.forEach(deserializeAssignmentAttributeUpdateElement);
}
function deserializeBaseNode(base) {
    base.inputs?.forEach(deserializeLiveAttributeUpdateElement);
    base.outputs?.forEach(deserializeOutputExpression);
    base.twoWayBinding?.forEach(deserializeLiveAttribute);
    base.templateAttrs?.forEach(deserializeLiveAttributeUpdateElement);
    base.attributeDirectives?.forEach(deserializeAttributeDirectives);
    base.attributes?.forEach(deserializeAssignmentAttributeUpdateElement);
}
function deserializeChild(child) {
    if (child instanceof DomElementNode) {
        // DomElementNode
        deserializeBaseNode(child);
        deserializeDomParentNode(child);
    }
    else if (child instanceof DomStructuralDirectiveNode) {
        child.templateExpressions = child.templateExpressions?.map(deserialize) ?? [];
        deserializeChild(child.node);
        deserializeBaseNode(child);
        child.successors?.forEach(deserializeChild);
    }
    else if (isLiveTextContent(child)) {
        deserializeLiveText(child);
    }
    else if (child instanceof DomFragmentNode) {
        deserializeDomParentNode(child);
    }
    else if (child instanceof LocalTemplateVariables) {
        deserializeLocalTemplateVariables(child);
    }
}
function deserializeDomParentNode(parent) {
    parent.children?.forEach(deserializeChild);
}
export function deserializeExpressionNodes(node) {
    if (node instanceof DomFragmentNode) {
        deserializeDomParentNode(node);
    }
    else {
        deserializeChild(node);
    }
}
//# sourceMappingURL=deserialize.js.map