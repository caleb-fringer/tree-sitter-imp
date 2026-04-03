/**
 * @file An impy little language
 * @author Caleb Fringer
 * @license GPL-3.0-or-later
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "imp",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
