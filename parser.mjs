import { Token, TokenType, lookup_token_type } from './tokens.mjs';


export class Parser{
    #tokens = [];
    #cursor = 0 ;

    constructor(tokens){
        this.#tokens = tokens;
    }

    #at(){
        return this.#tokens[this.#cursor];
    }

    #peek (n =1){
        return this.#tokens[this.#cursor +n];
    }

    #eatToken(tokenType){
        if(tokenType == this.#at().type)
            this.#cursor++;
        else
            throw Error(`Expected a token to be of type: ${tokenType} instead recieved: ${this.#at().type}`);
    }

    parse () {
        return this.#parseEquality()
    }

    //lowest precedence
    #parseEquality() {
        let leftHandSide = this.#parseExpression();
        const ttype = this.#at().type;
        while (ttype === TokenType.EQ || ttype === TokenType.NOT_EQ || ttype == TokenType.GT || ttype == TokenType.LT || ttype == TokenType.GTE || ttype == TokenType.LTE) {
          const operator = this.#at().literal;
          let rightHandSide = this.#parseExpression();
      
          leftHandSide = {
            type: "BinaryOperator",
            operator,
            leftHandSide,
            rightHandSide,
          };
        }
      
        return leftHandSide;
    }

    //addition/substraction

    #parseExpression (){
        let leftHandSide = this.#parseTerm();

        while(this.#at().type == TokenType.PLUS || this.#at().type == TokenType.MINUS){
            const operator = this.#at().literal;
            const ttype = (this.#at().type == TokenType.PLUS)? TokenType.PLUS : TokenType.MINUS;
            this.#eatToken(ttype);
            let rhs = this.#parseTerm();
            leftHandSide = {type: "BinaryOperator", operator, leftHandSide, rightHandSide: rhs};
        }

        return leftHandSide;
    }

    #parseTerm(){
        let leftHandSide = this.#parseFactor();

        while(this.#at().type == TokenType.DIVISION || this.#at().type == TokenType.MULTIPLICATION){
            const operator = this.#at().literal;
            const ttype = (this.#at().type == TokenType.DIVISION)? TokenType.DIVISION : TokenType.MULTIPLICATION;
            this.#eatToken(ttype);
            let rhs = this.#parseFactor();
            leftHandSide = {type: "BinaryOperator", operator, leftHandSide, rightHandSide: rhs};
        }


        return leftHandSide
    }

    #parseUnary() {
        if (this.#at().type === TokenType.LEN) {
            this.#eatToken(TokenType.LEN);
            this.#eatToken(TokenType.LPAREN);

            const expr = this.#parseExpression();

            this.#eatToken(TokenType.RPAREN);

            return {
                type: "UnaryOperator",
                operator: "LEN",
                operand: expr,
            };
        } else {
            // If it's not a "LEN" token, parse a regular factor
            return this.#parseFactor();
        }
    }

    //prescedencia mas alta
    #parseFactor(){

        if (this.#at().type == TokenType.INTEGER){
            let literal = new Token(TokenType.NUMERICL,this.#at().literal);
            this.#eatToken(TokenType.INTEGER);
            return literal;
        }

        //se añadio en el ultimo update

        if (this.#at().type == TokenType.STRING){
            let literal = new Token(TokenType.STRING,this.#at().literal);
            this.#eatToken(TokenType.STRING);
            return literal;
        }
        

        let expr;

        if (this.#at().type == TokenType.LPAREN){
            this.#eatToken(TokenType.LPAREN);
            expr = this.#parseExpression();
            this.#eatToken(TokenType.RPAREN);

            return expr;
            //se añadio en el ultimo update
        } else if (this.#at().type === TokenType.LEN) {
            return this.#parseUnary();
        } else {
            throw Error(`Expected a parenthesis token, integer, or "LEN" token in input.`);
        }
    }
}