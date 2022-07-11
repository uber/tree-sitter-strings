module.exports = grammar({
  name: 'strings',

  word: $ => $.identifier,

  rules: {
    program: $ => repeat($.statement),

    identifier: $ => /[\p{L}_$][\p{L}\p{Nd}_$]*/,

    string_literal: $ => token(choice(
      seq('"', repeat(choice(/[^\\"\n]/, /\\(.|\n)/)), '"'))),

    assignment_statement: $ => seq(
      field('left',  $.string_literal),
      field('operator', '='),
      field('right', $.string_literal),
      ';'
    ),

    statement: $ => seq($.block_comment, $.assignment_statement),

    block_comment: $ => token(
      seq(
        '/*',
        /[^*]*\*+([^/*][^*]*\*+)*/,
        '/'
      )
    ),
  }
});
