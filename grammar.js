/**
 * @file An impy little language
 * @author Caleb Fringer
 * @license GPL-3.0-or-later
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "imp",

  supertypes: $ => [
    $.expression,
  ],

  word: $ => $.identifier,

  rules: {
    source_file: $ => repeat($.expression),

    expression: $ => choice(
      $._value,
      $.identifier,
      $.binary_expr,
      $.assignment,
      $.if_expr,
      $.while_expr,
    ),

    identifier: $ => /[[:alpha:]][[:alnum:]]*/,

    assignment: $ => seq(
      field("id", $.identifier),
      ":=",
      field("val", $._value),
    ),

    integer: $ => /\d+/,

    boolean: $ => choice("true", "false"),

    _value: $ => choice(
      $.integer,
      $.boolean,
    ),

    binary_op: $ => choice(
      "+",
      "−",
      "∗",
      "/",
      ">",
      ">=",
      "<",
      "<="
    ),

    binary_expr: $ => prec(1,
      seq(
        prec.left(field("operand_1", $.expression)),
        prec.left(field("operator", $.binary_op)),
        prec.left(field("operand_2", $.expression)),
      )
    ),

    if_expr: $ => seq(
      "if",
      field("cond", $.expression),
      "then",
      field("if_val", $.expression),
      "else",
      field("else_val", $.expression),
    ),

    while_expr: $ => seq(
      "while",
      "(",
      field("cond", $.expression),
      ")",
      field("eval_expr", $.expression),
    ),
  }
});
