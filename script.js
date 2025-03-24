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