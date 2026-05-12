# Build
First, install the tree-sitter-cli as per the [documentation](https://tree-sitter.github.io/tree-sitter/creating-parsers/1-getting-started.html)

Then, build with `tree-sitter generate`

This will build `imp.so`, which is the static link library needed for parsing
the `imp` language.
