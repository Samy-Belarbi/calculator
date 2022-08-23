import { useState } from "react";

const ops = ["/", "*", "-", "+", "."];

const Calculator = () => {
  // STATES

  // En dehors de la parenthèse
  const [calc, setCalc] = useState("");

  // Dans la parenthèse
  const [result, setResult] = useState("");

  // COMPORTEMENTS
  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1))) ||
      (calc.includes(".") && value === ".") ||
      (value === "0" && calc.slice(0) === "0" && !calc.includes("."))
    ) {
      console.log(calc.slice());
      return;
    }

    setCalc(calc + value);

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const calculate = () => {
    if (!ops.includes(calc.charAt(calc.length - 1))) {
      setCalc(eval(calc).toString());
      setResult("");
    }
  };

  // const importDigits = () => {
  //   const digits = [];

  //   for (let i = 1; i < 10; i++) {
  //     digits.push(
  //       <button key={i} onClick={() => updateCalc(i.toString())}>
  //         {i}
  //       </button>
  //     );
  //   }

  //   return digits;
  // };

  const deleteLastNumber = () => {
    if (calc !== "") {
      const newValue = calc.slice(0, -1);
      const lastCharac = newValue.charAt(newValue.length - 1);
      setCalc(newValue);

      if (!ops.includes(lastCharac) && lastCharac !== "") {
        setResult(eval(newValue).toString());
      }

      if (!ops.includes(lastCharac) && lastCharac === "") {
        setResult("");
      }

      return;
    }
  };

  // AFFICHAGE
  return (
    <div className="calculator">
      <div className="result">
        {result ? <span>({result})</span> : ""}
        {calc || "0"}
      </div>
      <div className="operators">
        <button onClick={() => updateCalc("/")}>/</button>
        <button onClick={() => updateCalc("*")}>*</button>
        <button onClick={() => updateCalc("-")}>-</button>
        <button onClick={() => updateCalc("+")}>+</button>
        <button onClick={deleteLastNumber}>DEL</button>
      </div>
      <div className="digits">
        {Array(9)
          .fill(0)
          .map((_, i) => (
            <button key={i + 1} onClick={() => updateCalc(String(i + 1))}>
              {i + 1}
            </button>
          ))}
        <button onClick={() => updateCalc(".")}>.</button>
        <button onClick={() => updateCalc("0")}>0</button>
        <button onClick={calculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
