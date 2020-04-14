import "../css/index.css";

type CalcState = null | "add" | "subtract" | "multiply" | "divide"
var opMap = {
    multiply: (a, b) => a*b,
    divide: (a, b) => a/b,
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
}

let buttons = document.querySelectorAll(".button");
var display: string = "0";
var prevNum: string = null;
var curState: CalcState = null;


for (var button of buttons) {
    console.log(button);
    (button as HTMLDivElement).addEventListener("click", createClickListener(button.getAttribute("value")));
}

function createClickListener(key: string) {

    return ()=>{
        switch (key) {
            case "ac":
                display = "0";
                curState = null;
                prevNum = null;
                break;
            case "+-":
                display = (-parseFloat(display)).toString();
                break;
            case "%":
                display = (0.01*parseFloat(display)).toString();
                break;
            case "/":
                curState = "divide";
                prevNum = display;
                display = null;
                break;
            case "x":
                curState = "multiply";
                prevNum = display;
                display = null;
                break;
            case "-":
                curState = "subtract";
                prevNum = display;
                display = null;
                break;
            case "+":
                curState = "add";
                prevNum = display;
                display = null;
                break;
            case "=":
                if (curState) {
                    if (display) {
                        [display,prevNum] = [opMap[curState](parseFloat(prevNum), parseFloat(display)).toString(),display];
                    }
                    else {
                        display = opMap[curState](parseFloat(prevNum), parseFloat(prevNum)).toString();
                    }
                }
                else {
                    prevNum = display;
                }
                break;
            default:
                if (display == null) display = "";
                display = display + key;
                break;
        }
        if (display) {
            var decimalpoint = display.length > 0 && display.includes(".");
            if (!decimalpoint) display = parseFloat(display).toString();

            document.getElementById("display").innerText = display;
        }
    }
}