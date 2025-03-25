// EVENT LISTENER FOR HERON
document.getElementById("heronCalc").addEventListener("click", function(){
    const sideA=document.getElementById("heronA").value;
    const sideB=document.getElementById("heronB").value;
    const sideC=document.getElementById("heronC").value;
    document.getElementById("heronArea").value=heron(sideA, sideB, sideC);
});

// EVENT LISTENER FOR AMBICASE
document.getElementById("ambCalc").addEventListener("click", function(){
    const angle=document.getElementById("ambAngle").value;
    const sideA=document.getElementById("ambSideA").value;
    const sideB=document.getElementById("ambSideB").value;
    document.getElementById("ambType").value=ambCase(angle, sideA, sideB);
});

// EVENT LISTENER FOR NEWTONS
document.getElementById("newtonCalc").addEventListener("click", function(){
    const guess=document.getElementById("newRoot").value;
    document.getElementById("newApp").value=newton(guess);
});

// EVENT LISTENER FOR POLYFUN
document.getElementById("polyCalc").addEventListener("click", function() {
    try {
        const coefficient = document.getElementById("polyCo").value.trim();
        const exponent = document.getElementById("polyExp").value.trim();
        const xvalue = parseFloat(document.getElementById("polyX").value);
        
        // Validate inputs
        if (!coefficient || !exponent || isNaN(xvalue)) {
            throw new Error("Please enter valid coefficients, exponents, and x value");
        }
        
        const result = polynomial(coefficient, exponent, xvalue);
        
        document.getElementById("polyFun").value = result.eq;
        document.getElementById("polyEva").value = "f(" + xvalue + ") = " + result.sum;
    } catch (error) {
        alert(error.message);
        document.getElementById("polyFun").value = "";
        document.getElementById("polyEva").value = "";
    }
});


// ACTUAL MATH PART!!

function heron(a, b, c){
    const root=Math.sqrt(4*a*a*b*b-Math.pow((a*a+b*b-c*c), 2));
    if (a>0 && b>0 && c>0){

        if (root>0){ //Checks if root is imaginary
            return (Math.round(root*25, 2))/100;
        }
    } return "No triangle";
}
function ambCase(angle, a, b) {

    // Checks for invalid inputs (non-positive values)
    if (angle <= 0 || a <= 0 || b <= 0) {
        return "No triangle";
    }

    // Convert angle to radians for calculations
    const angleRad = angle * Math.PI / 180;
    const h = b * Math.sin(angleRad);

    // Case 1: Angle is greater than 180 degrees - invalid
    if (angle >= 180) {
        return "No triangle";
    }

    // Case 2: Angle is exactly 90 degrees (right angle)
    if (angle === 90) {
        if (a === h) {
            return "Right triangle";
        } else if (a > h) {
            return "One triangle (right triangle)";
        } else {
            return "No triangle";
        }
    }

    // Case 3: Angle is acute (0 < angle < 90)
    if (angle < 90) {
        if (a < h) {
            return "No triangle";
        } else if (a === h) {
            return "One triangle (right triangle)";
        } else if (a < b) {
            return "Two triangles (ambiguous case)";
        } else { // a >= b
            return "One triangle";
        }
    }

    // Case 4: Angle is obtuse (90 < angle < 180)
    if (angle > 90) {
        if (a <= b) {
            return "No triangle";
        } else { // a > b
            return "One triangle";
        }
    }
    return "No triangle";
}

function newton(guess){
    let x0=guess;
    let x1=x0;
    function fx (x){ //Functions for visibility
        return 6*Math.pow(x, 4) - 13*Math.pow(x, 3) - 18*Math.pow(x, 2) + 7*x + 6;
    } function fx1 (x){
        return 24*Math.pow(x, 3) - 39*Math.pow(x, 2) - 36*x + 7
    }
    do {
        x0=x1;
        x1=x0-fx(x0)/fx1(x0);
    } while (Math.abs(x0-x1)>0.0001);
    return Math.round(x1*100)/100; //Returns root value
}

function polynomial(coeff, exp, x) {
    // Split and filter out empty strings
    let coefficients = coeff.split(" ").filter(c => c !== "");
    let exponents = exp.split(" ").filter(e => e !== "");
    
    // Validate equal number of coefficients and exponents
    if (coefficients.length !== exponents.length) {
        throw new Error("Number of coefficients must match number of exponents");
    }

    const output = {
        sum: 0,
        eq: ""
    };

    for (let i = 0; i < coefficients.length; i++) {
        // Parse coefficients and exponents
        const coeff = parseFloat(coefficients[i]);
        const exp = parseFloat(exponents[i]);
        
        // Skip if invalid numbers
        if (isNaN(coeff) || isNaN(exp)) continue;

        // Build equation string
        if (i > 0 && coeff >= 0) {
            output.eq += " + ";
        } else if (i > 0 && coeff < 0) {
            output.eq += " - ";
        } else if (coeff < 0) {
            output.eq += "-";
        }

        // Add coefficient (skip if 1)
        const absCoeff = Math.abs(coeff);
        if (absCoeff !== 1 || exp === 0) {
            output.eq += absCoeff;
        }

        // Add variable and exponent
        if (exp !== 0) {
            output.eq += "x";
            if (exp !== 1) {
                output.eq += "^" + exp;
            }
        }

        // Calculate term value
        const termValue = coeff * Math.pow(x, exp);
        output.sum += termValue;
    }

    // Handle empty result
    if (output.eq === "") {
        output.eq = "0";
        output.sum = 0;
    }

    return output;
}