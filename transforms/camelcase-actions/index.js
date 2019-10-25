const recast = require('ember-template-recast');
const { builders: b } = recast;

const changeActions = {
  onchange: 'onChange',
  onkeydown: 'onKeydown',
  onfocus: 'onFocus',
  onblur: 'onBlur',
  onopen: 'onOpen',
  onclose: 'onClose',
};

function isPowerSelectMustache(node) {
  return node.path.type == 'PathExpression' && node.path.original == 'power-select';
}

function transformMustache(node) {
  let pairs = node.hash.pairs.map(attr => {
    if (Object.keys(changeActions).includes(attr.key)) {
      return b.pair(changeActions[attr.key], attr.value, attr.loc);
    }

    return attr;
  });

  let hash = b.hash(pairs);

  switch (node.type) {
    case 'MustacheStatement':
      return b.mustache(node.path, node.params, hash);
    case 'BlockStatement':
      return b.block(node.path, node.params, hash, node.program);
  }
}

function isPowerSelectAngleBracket(node) {
  return node.tag === 'PowerSelect';
}

function transformAngleBracket(node) {
  let attributes = node.attributes.map(attr => {
    let actionName = attr.name.substr(1);
    if (Object.keys(changeActions).includes(actionName)) {
      return b.attr(`@${changeActions[actionName]}`, attr.value, attr.loc);
    }

    return attr;
  });

  return b.element(
    {
      name: node.tag,
      selfClosing: node.selfClosing,
    },
    {
      attrs: attributes,
      modifiers: node.modifiers,
      children: node.children,
      comments: node.comments,
      blockParams: node.blockParams,
      loc: node.loc,
    }
  );
}

module.exports = function transformer(file) {
  let { code: toCamelCase } = recast.transform(file.source, () => {
    return {
      MustacheStatement(node) {
        if (isPowerSelectMustache(node)) {
          return transformMustache(node);
        }
      },
      BlockStatement(node) {
        if (isPowerSelectMustache(node)) {
          return transformMustache(node);
        }
      },
      ElementNode(node) {
        if (isPowerSelectAngleBracket(node)) {
          return transformAngleBracket(node);
        }
      },
    };
  });

  return toCamelCase;

  // return j(file.source)
  //   .find(j.Identifier)
  //   .forEach(path => {
  //     path.node.name = path.node.name
  //       .split('')
  //       .reverse()
  //       .join('');
  //   })
  //   .toSource();
};
