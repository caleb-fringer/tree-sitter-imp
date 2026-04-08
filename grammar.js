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
      $.seq_expr,
    ),

    identifier: $ => /[[:alpha:]][[:alnum:]]*/,

    assignment: $ => seq(
      field("id", $.identifier),
      ":=",
      field("val", $._value),
    ),

    seq_expr: $ => prec.left(seq(
      field("e1", $.expression),
      ";",
      field("e2", $.expression)
    )),

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

    binary_expr: $ => prec.left(1,
      seq(
        field("operand_1", $.expression),
        field("operator", $.binary_op),
        field("operand_2", $.expression),
      )
    ),

    if_expr: $ => seq(
      "if",
      field("cond", $.expression),
      "then",
      field("if_val", $.expression),
      "else",
      field("else_val", $.expression),
      "end"
    ),

    while_expr: $ => seq(
      "while",
      field("cond", $.expression),
      "do",
      field("eval_expr", $.expression),
      "end"
    ),
  }
});
