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
document.getElementById("polyCalc").addEventListener("click", function(){
    const coefficient=document.getElementById("polyCo").value;
    const exponent=document.getElementById("polyExp").value;
    const xvalue=document.getElementById("polyX").value;
    document.getElementById("polyFun").value=polynomial(coefficient, exponent, xvalue).eq;
    document.getElementById("polyEva").value="f(x) = " + polynomial(coefficient, exponent, xvalue).sum;

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