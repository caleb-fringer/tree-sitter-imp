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

  reserved: {
    global_keywords: $ => [
      "if", "then", "else", "end", "while", "do", "end", "done"
    ],
  },

  rules: {
    source_file: $ => repeat($.expression),

    expression: $ => choice(
      $._value,
      $.identifier,
      $.binary_expr,
      $.declaration,
      $.assignment,
      $.if_expr,
      $.while_expr,
      $.seq_expr,
    ),

    identifier: $ => /[[:alpha:]][[:alnum:]]*/,

    declaration: $ => prec.left(seq(
      field("id", $.identifier),
      ":=",
      field("val", $.expression)
    )),

    assignment: $ => prec.left(seq(
      field("id", $.identifier),
      "=",
      field("val", $.expression),
    )),

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

    _binary_op: $ => choice(
      $.arithmetic_op,
      $.relational_op,
    ),

    arithmetic_op: $ => choice(
      "+",
      "-",
      "*",
      "/",
    ),

    relational_op: $ => choice(
      ">",
      ">=",
      "<",
      "<="
    ),

    binary_expr: $ => prec.left(1,
      seq(
        field("operand_1", $.expression),
        field("operator", $._binary_op),
        field("operand_2", $.expression),
      )
    ),

    if_expr: $ => seq(
      "if",
      field("cond", $.expression),
      "then",
      field("if_val", $.expression),
      optional(seq(
        "else",
        field("else_val", $.expression),
      )),
      "end"
    ),

    while_expr: $ => seq(
      "while",
      field("cond", $.expression),
      "do",
      field("eval_expr", $.expression),
      "done"
    ),
  }
});
