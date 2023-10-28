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
/*
export function evaluate(ast){
    switch (ast.type){
        case "NumericLiteral":
            return ast;
        case "BinaryOperator":
            return eval_binary_expr(ast);
        default:
            console.error("This AST Node has not yet been setup for interpretation.",ast);

    }
}*/
export function evaluate(ast, symbolTable) {
  switch (ast.type) {
    case "NumericLiteral":
      return ast;
    case "BinaryOperator":
      return eval_binary_expr(ast);
    case "IfStatement":
      return eval_if_statement(ast, symbolTable);
    default:
      console.error("This AST Node has not yet been set up for interpretation.", ast);
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
  function eval_if_statement(ifStatement, symbolTable) {
    const condition = evaluate(ifStatement.condition, symbolTable);
  
    if (condition.type === TokenType.NUMERICL) {
      if (condition.literal) {
        return evaluate(ifStatement.ifBody, symbolTable);
      } else if (ifStatement.elseBody) {
        return evaluate(ifStatement.elseBody, symbolTable);
      }
    }
  
    throw new Error("Invalid condition in 'if' statement.");
    
  }
