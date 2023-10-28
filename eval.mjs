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
        default:
            console.error("This AST Node has not yet been setup for interpretation.",ast);

    }
}

function eval_binary_expr(binop) {
    const lhs = evaluate(binop.leftHandSide);
    const rhs = evaluate(binop.rightHandSide);
  
    // Only currently support numeric operations
    if (lhs.type == "NumericLiteral" && rhs.type == "NumericLiteral") {
      return eval_numeric_binary_expr(lhs,rhs,binop.operator);
    }
  
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
        return new Token(TokenType.NUMERICL, result);
  }
