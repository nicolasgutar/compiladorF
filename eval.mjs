import { Token, TokenType } from "./tokens.mjs";

/*
export function evaluate(astNode): {
    switch (astnode.type) {
      case "NumericLiteral":
        return astnode.literal;
      case "BinaryExpr":
        return eval_binary_expr(astNode);
      // Handle unimplimented ast types as error.
      default:
        console.error(
          "This AST Node has not yet been setup for interpretation.",
          astNode,
        );
        Deno.exit(0);
    }
  }
*/

export function evaluate(ast){
    switch (ast.type){
        case "NumericLiteral":
            return ast;
        case "BinaryOperator":
            return eval_binary_expr(ast);
        case "STRING":
            return ast;
          case "UnaryOperator":
            return eval_unary_expr(ast);
        default:
            console.error("This AST Node has not yet been setup for interpretation.",ast);

    }
}

function eval_unary_expr(binop) {
  let result;
  switch(binop.operator){
    case "LEN":
      result =  binop.operand.literal.length
  }
  return new Token(TokenType.NUMERICL, result);
}

function eval_binary_expr(binop) {
    const lhs = evaluate(binop.leftHandSide);
    const rhs = evaluate(binop.rightHandSide);
  
    // Only currently support numeric operations
    if (lhs.type == "NumericLiteral" && rhs.type == "NumericLiteral") {
      return eval_numeric_binary_expr(lhs,rhs,binop.operator);
    }

    if (lhs.type == "STRING" && rhs.type == "STRING") {
      return eval_string_exp(lhs,rhs,binop.operator)
    }

    console.error("unsopported operation between " + lhs.type + " and " + rhs.type);

  
    // One or both are NULL
    console.log("error");
}

function eval_numeric_binary_expr(lhs,rhs,operator) {
    let result;
    lhs = parseInt(lhs.literal);
    rhs = parseInt(rhs.literal);
    switch (operator) {
      case "==":
        result = lhs == rhs;
        break;
      case "!=":
        result = lhs != rhs;
        break;
      case ">=":
        result = lhs >= rhs;
        break;
      case "<=":
        result = lhs <= rhs;
        break;
      case ">":
        result = lhs > rhs;
        break;
      case "<":
        result = lhs < rhs;
        break;
      case "+":
        result = lhs + rhs;
        break;
      case "-":
        result = lhs - rhs;
        break;
      case "*":
        result = lhs * rhs;
        break;
      case "/":
        if (rhs == 0) {
          throw new Error("Division by zero");
        }
        result = lhs / rhs;
        break;
      default:
        throw new Error("Unsupported binary operator: " + operator);
    }
    console.log(result);
    return new Token(TokenType.NUMERICL, result);

  }

  function eval_string_exp(lhs,rhs,operator){
    let result;
    if (operator == "+"){
      return lhs.literal + rhs.literal;
    }
    console.error("unsupported operator " + operator + " for strings")
  }
