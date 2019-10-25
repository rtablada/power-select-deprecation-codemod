const { getOptions } = require('codemod-cli');
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

function isPowerSelectNode(node) {
  return node.path.type == 'PathExpression' && node.path.original == 'power-select';
}

function transformAttrs(node) {
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
      debugger;
      return b.block(node.path, node.params, hash, node.program);
  }
}

module.exports = function transformer(file, api) {
  // const j = getParser(api);
  const options = getOptions();

  let { code: toCamelCase } = recast.transform(file.source, () => {
    return {
      MustacheStatement(node) {
        if (isPowerSelectNode(node)) {
          return transformAttrs(node);
        }
      },
      BlockStatement(node) {
        if (isPowerSelectNode(node)) {
          return transformAttrs(node);
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
