export class Token {
    constructor(type, literal) {
      this.type = type;
      this.literal = literal;
    }
  
    toString() {
      return `<${this.type}:${this.literal}>`;
    }
  }
  
  function lookup_token_type(literal) {
  const keywords = {
    'variable': TokenType.LET,
    'funcion': TokenType.FUNCTION,
    'for': TokenType.FOR,
    'mientras': TokenType.WHILE,
    'clase': TokenType.CLASS,
    'verdadero':TokenType.TRUE,
    'si':TokenType.IF,
    'regresa':TokenType.RETURN,
    'falso':TokenType.FALSE
  
  }
  return keywords[literal] || TokenType.IDENT;
  }
  
  const TokenType = {
    ASSIGN: 'ASSIGN',
    COMMA: 'COMMA',
    FOR: 'FOR',
    EOF: 'EOF',
    WHILE: 'WHILE',
    FUNCTION: 'FUNCTION',
    IDENT: 'IDENT',
    ILLEGAL: 'ILLEGAL',
    INT: 'INT',
    LBRACE: 'LBRACE',
    LET: 'LET',
    LPAREN: 'LPAREN',
    MINUS: 'MINUS',
    PLUS: 'PLUS',
    RBRACE: 'RBRACE',
    RPAREN: 'RPAREN',
    SEMICOLON: 'SEMICOLON',
    EQ: 'EQ',
    NUMERICL: "NumericLiteral",
    CLASS: 'CLASS',
    INTEGER: 'INTEGER',
    LBRACKET: 'LBRACKET',
    RBRACKET: 'RBRACKET',
    DIVISION: 'DIVISION',
    ELSE: 'ELSE',
    GT: 'GT',
    GTE: 'GTE',
    LT: 'LT',
    LTE: 'LTE',
    MULTIPLICATION: 'MULTIPLICATION',
    NEGATION: 'NEGATION',
    NOT_EQ: 'NOT_EQ',
    TRUE: 'TRUE',
    FALSE: 'FALSE',
    IF: 'IF',
    RETURN: 'RETURN',
  };
  
  Object.freeze(TokenType);
  
  export {TokenType,lookup_token_type};