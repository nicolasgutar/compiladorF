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
    DIVISION: 'DIVISION', // Added missing entry
    ELSE: 'ELSE', // Added missing entry
    GT: 'GT', // Added missing entry
    LT: 'LT', // Added missing entry
    MULTIPLICATION: 'MULTIPLICATION', // Added missing entry
    NEGATION: 'NEGATION', // Added missing entry
    NOT_EQ: 'NOT_EQ', // Added missing entry
    TRUE: 'TRUE', // Added missing entry
    FALSE: 'FALSE', // Added missing entry
    IF: 'IF', // Added missing entry
    RETURN: 'RETURN', // Added missing entry
  };
  
  Object.freeze(TokenType);
  
  export {TokenType,lookup_token_type};