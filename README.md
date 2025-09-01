# Polynomial Coefficient Solver 🚀

This is a Node.js script that determines the coefficients of a polynomial by performing **Lagrange Interpolation** on a given set of points. It is designed to solve for a polynomial of degree `k-1` given `k` points and can handle very large numbers using JavaScript's native `BigInt`.

The core logic reads data from an `input.json` file, processes numbers from various bases, and calculates the final coefficients of the unique polynomial that fits the provided points.

-----

## Features ✨

  * **Lagrange Interpolation**: Solves for polynomial coefficients using a standard mathematical algorithm.
  * **Large Number Support**: Handles arbitrarily large integers via `BigInt`, making it suitable for cryptographic or complex computational problems.
  * **Multi-Base Input**: Parses input numbers from various numerical bases (from base 2 to base 36).
  * **File-Based Input**: Reads all required data directly from a simple `input.json` file for easy configuration and testing.

-----

## Requirements 🔧

  * **Node.js**: Version 12.0.0 or higher is recommended for full `BigInt` support.

-----

## ⚙️ Installation & Usage

No external dependencies are required. Just clone the repository or download the script.

### **Step 1: Create the Input File**

Create a file named `input.json` in the same directory as the script (`solveFromFile.js`).

### **Step 2: Populate the Input File**

Add the polynomial data to `input.json` according to the format described below.

### **Step 3: Run the Script**

Execute the script from your terminal. The output will be printed directly to the console.

```bash
node solveFromFile.js
```

-----

## 📝 Input Format

The `input.json` file must contain a single JSON object with the following structure:

  * **`keys`**: An object containing metadata.
      * `n`: The total number of points provided in the file.
      * `k`: The minimum number of points required to define the polynomial. The script will use the first `k` points (from key "1" to key "k") to perform its calculation. The degree of the resulting polynomial will be `k - 1`.
  * **`"1"`, `"2"`, ...**: A series of objects, where the key is a string representing the integer **x-coordinate** of a point.
      * `base`: A string representing the numerical base of the `value`.
      * `value`: A string representing the **y-coordinate** of the point in the specified `base`.

-----

## Example

Here is an example of a valid `input.json` file and its corresponding output.

### **`input.json`**

```json
{
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}
```

### **Running the Command**

```bash
node solveFromFile.js
```

### **Expected Output**

The script will find the coefficients for the polynomial $P(x) = 1x^2 + 0x + 3$.

```
Using the first k=3 points to solve...

--- Found Polynomial Coefficients ---
c0: 3
c1: 0
c2: 1
```
