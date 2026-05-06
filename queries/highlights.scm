[
  "if"
	"then"
	"else"
	"end"
] @keyword.conditional

[
 "while"
 "do"
 "done"
] @keyword.repeat

";" @punctuation.delimiter

[
 "("
 ")"
] @punctuation.bracket

(integer) @number

(boolean) @boolean

(identifier) @variable
