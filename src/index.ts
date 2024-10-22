export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find all i18n.init function calls
  root.find(j.CallExpression, {
    callee: {
      object: { name: 'i18n' },
      property: { name: 'init' }
    }
  }).forEach(path => {
    const args = path.node.arguments;
    if (args.length === 1 && j.ObjectExpression.check(args[0])) {
      const properties = args[0].properties;

      // Filter out 'options' and 'interpolation' properties
      const filteredProperties = properties.filter(prop => {
        if (j.ObjectProperty.check(prop) && j.Identifier.check(prop.key)) {
          const keyName = prop.key.name;
          return keyName !== 'options' && keyName !== 'interpolation';
        }
        return true;
      });

      // If any properties were removed, update the node
      if (filteredProperties.length !== properties.length) {
        args[0].properties = filteredProperties;
        dirtyFlag = true;
      }
    }
  });

  // Remove the 'options' variable declaration if it exists
  root.find(j.VariableDeclaration).forEach(path => {
    const declarations = path.node.declarations;
    const filteredDeclarations = declarations.filter(decl => {
      if (j.VariableDeclarator.check(decl) && j.Identifier.check(decl.id)) {
        return decl.id.name !== 'options';
      }
      return true;
    });

    if (filteredDeclarations.length !== declarations.length) {
      if (filteredDeclarations.length === 0) {
        j(path).remove();
      } else {
        path.node.declarations = filteredDeclarations;
      }
      dirtyFlag = true;
    }
  });

  return dirtyFlag ? root.toSource() : undefined;
}


export const parser = "tsx";