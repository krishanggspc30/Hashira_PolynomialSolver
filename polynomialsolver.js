// 1. Import the built-in 'fs' module
const fs = require('fs');

/**
 * A helper function to parse a string value in a given base into a BigInt.
 * (This function is the same as before)
 */
function parseBigInt(valueStr, base) {
    // ... same implementation ...
    const digits = '0123456789abcdefghijklmnopqrstuvwxyz';
    const bigBase = BigInt(base);
    let result = 0n;

    for (const char of valueStr) {
        const digitValue = digits.indexOf(char.toLowerCase());
        if (digitValue === -1 || digitValue >= base) {
            throw new Error(`Invalid character '${char}' for base ${base}`);
        }
        result = result * bigBase + BigInt(digitValue);
    }
    return result;
}


/**
 * A class to represent a polynomial with BigInt coefficients.
 * (This class is the same as before)
 */
class Polynomial {
    // ... same implementation ...
    constructor(coeffsOrDegree) {
        if (typeof coeffsOrDegree === 'number') {
            this.coeffs = Array(coeffsOrDegree + 1).fill(0n);
        } else {
            this.coeffs = [...coeffsOrDegree];
        }
    }
    degree() { return this.coeffs.length - 1; }
    add(other) {
        const maxDegree = Math.max(this.degree(), other.degree());
        const resultCoeffs = Array(maxDegree + 1).fill(0n);
        for (let i = 0; i <= maxDegree; i++) {
            resultCoeffs[i] = (this.coeffs[i] || 0n) + (other.coeffs[i] || 0n);
        }
        return new Polynomial(resultCoeffs);
    }
    multiply(other) {
        const newDegree = this.degree() + other.degree();
        const newCoeffs = Array(newDegree + 1).fill(0n);
        for (let i = 0; i <= this.degree(); i++) {
            for (let j = 0; j <= other.degree(); j++) {
                newCoeffs[i + j] += this.coeffs[i] * other.coeffs[j];
            }
        }
        return new Polynomial(newCoeffs);
    }
    scaleAndDivide(numerator, denominator) {
        return new Polynomial(this.coeffs.map(c => (c * numerator) / denominator));
    }
    toString() {
        return this.coeffs.map((c, i) => `c${i}: ${c}`).join('\n');
    }
}


// Main execution logic
function solvePolynomial(jsonInput) {
    // ... This entire function is the same as before ...
    const data = JSON.parse(jsonInput);
    const k = data.keys.k;
    const points = [];
    console.log(`Using the first k=${k} points to solve...`);
    for (let i = 1; i <= k; i++) {
        const key = String(i);
        const pointData = data[key];
        const base = parseInt(pointData.base, 10);
        const valueStr = pointData.value;
        points.push({
            x: BigInt(i),
            y: parseBigInt(valueStr, base)
        });
    }
    let resultPolynomial = new Polynomial(k - 1);
    for (let j = 0; j < k; j++) {
        const currentPoint = points[j];
        let numeratorPoly = new Polynomial([1n]);
        let denominator = 1n;
        for (let i = 0; i < k; i++) {
            if (i === j) continue;
            const otherPoint = points[i];
            const factorPoly = new Polynomial([-otherPoint.x, 1n]);
            numeratorPoly = numeratorPoly.multiply(factorPoly);
            denominator *= (currentPoint.x - otherPoint.x);
        }
        const termPoly = numeratorPoly.scaleAndDivide(currentPoint.y, denominator);
        resultPolynomial = resultPolynomial.add(termPoly);
    }
    console.log("\n--- Found Polynomial Coefficients ---");
    console.log(resultPolynomial.toString());
}

// 2. Read the input from a file instead of a hardcoded string
try {
    const jsonInput = fs.readFileSync('input2.json', 'utf8');
    solvePolynomial(jsonInput);
} catch (error) {
    console.error("Error reading or parsing input.json:", error.message);
}