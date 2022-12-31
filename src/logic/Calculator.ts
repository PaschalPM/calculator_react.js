import { BtnKey } from "../components/Keypad/Button"

// Maths Operators
const optrsPattern = /(\+|-|\/|x)/
const lastCharOP = /(\+|-|\/|x)$/
let result: string = ""
let resCache: string = ""
let equalsKeyPressNo: number = 0 // Number of times = key was pressed repetitively

/**
 * Resets Expression for new calculation after displayed result
 * @param input 
 * @param expression 
 * @param setexpression 
 */
const resetConstraint = (input: BtnKey, expression: string, setexpression: Function) => {
    if (input.match(/[0-9]/) && result && !expression.match(lastCharOP)) {
        setexpression("")
    }
}

/**
 * Handles caches result and persists result from repetitively hitting 
 * equalsTo key
 * @param input 
 * @param setexpression 
 * @returns 
 */
const handleCachedResult = (input: BtnKey, setexpression: Function) => {
    let condition = (input == "=" && equalsKeyPressNo >= 1 && resCache)

    if (condition) {
        setexpression((v: string) => eval(v + resCache).toString())
    }
    return condition
}
/**
 * Constraint for input [0 - 9]
 * @param input 
 * @param expression 
 * @param setexpression 
 * @returns 
 */
const generalConstraint = (input: BtnKey, expression: string, setexpression: Function) => {
    let condition = input.match(/[1-9]/)

    // Reset Result and Result cache
    result = resCache = ""

    if (condition) {
        // If expression = "0" reset it to number (1 - 9)

        if (expression == "0")
            setexpression(input)
        else if (expression.match(/\.0+$/))
            setexpression((v: string) => v + input)
        else if (expression.match(/(\+|-|\/|x)0$/))
            setexpression((v: string) => v.slice(0, -1) + input)
        else
            setexpression((v: string) => v + input)
    }
    return condition
}
/**
 * Reset Arithmetic Expression displayed on Screen
 * @param input 
 * @param setexpression 
 * @returns 
 */
const ACConstraint = (input: BtnKey, setexpression: Function) => {
    let condition = input == "AC"

    if (condition) {
        setexpression("0")
    }
    return condition
}
/**
 * Constraints for Operators to prevent successive repetition
 * and more
 * @param input 
 * @param expression 
 * @param setexpression 
 * @returns 
 */
const operatorConstraint = (input: BtnKey, expression: string, setexpression: Function) => {
    let condition = input.match(optrsPattern)

    if (condition) {
        if (expression && expression.match(lastCharOP))
            setexpression((v: string) => v.slice(0, -1) + input)
        else if (!expression || expression == "0")
            setexpression((v: string) => v + "")
        else
            setexpression((v: string) => v + input)
    }
    return condition
}
/**
 * Prevents point repetitions
 * @param input 
 * @param expression 
 * @param setexpression 
 * @returns 
 */
const pointConstraint = (input: BtnKey, expression: string, setexpression: Function) => {
    let condition = input == "."

    if (condition) {
        if (expression == "0")
            setexpression("0.")
        else if (expression.match(lastCharOP))
            setexpression((v: string) => v + "0.")
        else if (!expression.match(/\.\d*$/))
            setexpression((v: string) => v + ".")
    }
    return condition
}

/**
 * Constraints zero input
 * 
 * @param input 
 * @param expression 
 * @param setexpression 
 * @returns 
 */
const zeroConstraint = (input: BtnKey, expression: string, setexpression: Function) => {
    let condition = (input == "0")

    if (condition) {
        if (expression.match(/[1-9\.]\d*$/))
            setexpression((v: string) => v + "0")
        else if (expression.match(lastCharOP))
            setexpression((v: string) => v + "0")
    }
    return condition
}
/**
 * Parses and evaluates expression then displays result
 * 
 * @param input 
 * @param expression 
 * @param setexpression 
 * @returns 
 */
const evaluate = (input: BtnKey, expression: string, setexpression: Function,
                    errorState:Function) => {
    let condition = input == "="
    let exp = expression
    let matchArray: RegExpMatchArray | null = null

    if (condition) {
        try {
            // parses x for * 
            exp = exp.replace(/x/g, (m) => '*')
            result = (eval(exp) as number).toString()
            setexpression(result)
            matchArray = exp.match(/[\*\+\/\-]\d*\.?\d+$/)
            if (matchArray)
                resCache = matchArray![0]
            equalsKeyPressNo++
        } catch (e) {
            // Throws up error alert
            errorState(true)
            setTimeout(()=>{
                errorState(false)
            },3000)
        }
    }
    return condition
}
export const Execute = (input: BtnKey, expression: string, setexpression: Function, 
                        errorState: Function) => {

    if (ACConstraint(input, setexpression))
        return

    // Resets Expression for new calculation after result
    resetConstraint(input, expression, setexpression)

    // Handle Cached result
    if (handleCachedResult(input, setexpression))
        return

    if (generalConstraint(input, expression, setexpression))
        return
    
    if (operatorConstraint(input, expression, setexpression))
        return
    if (pointConstraint(input, expression, setexpression))
        return
    if (zeroConstraint(input, expression, setexpression))
        return

    evaluate(input, expression, setexpression, errorState)
}
