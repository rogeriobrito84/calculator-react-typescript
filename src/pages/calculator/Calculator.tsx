import { PropsWithChildren, useEffect, useState } from "react";
import { CharacterEnum } from "../../app/enums/CharacterEnum";
import { CalculatorService } from "../../app/service/Calculator.service";
import Button from "../../components/Button";
import Display from "../../components/Display";
import "./Calculator.scss";

const keyNumber = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const keyOperation = ["+", "-", "*", "/", "=", "Enter", "÷"];
const KeyBackSpace = "Backspace";
const Keydecimal = [".", ","];
const KeyClean = ["Delete", "Escape"]

type CalculatorProps = {
    event?: KeyboardEvent;
}

const Calculator = (props: PropsWithChildren<CalculatorProps>) => {

    const service = CalculatorService.getInstance();
    const [displayValue, setDisplay] = useState(CharacterEnum.ZERO.toString());
    const [key, setKey] = useState("");


    useEffect(() => {
        clearMemory();
        window.addEventListener("keydown", keyDown);
    }, []);

    useEffect(() => {
        handleKeyDown()
        setKey(k => k = "");
    }, [key]);

    const clearMemory = () => {
        const valueDisplay = service.clearMemoryDisplay();
        setDisplay(valueDisplay);
    }

    const addDigit = (digit: string) => {
        const valueDisplay = service.getDisplayNumber(displayValue, digit);
        setDisplay(valueDisplay);
    }

    const setOperation = (operation: string) => {
        let valueDisplay = service.setDisplayOperation(displayValue, operation);
        setDisplay(valueDisplay);
    }

    const backSpace = () => {
        let valueDisplay = service.backSpace(displayValue);
        setDisplay(valueDisplay);
    }

    const keyDown = (event: KeyboardEvent) => {
        setKey(event.key);
    }

    const handleKeyDown = () => {
        if (key) {
            if (keyNumber.includes(key)) {
                let digit = key;
                if (Keydecimal.includes(key)) digit = CharacterEnum.DOT;
                addDigit(digit);
            } else if (KeyClean.includes(key)) {
                clearMemory();
            } else if (keyOperation.includes(key)) {
                let operation = key;
                if (key === keyOperation[2]) operation = CharacterEnum.MULTIPLICATION;
                if (key === keyOperation[5]) operation = CharacterEnum.EQUAL;
                if (key === keyOperation[3]) operation = CharacterEnum.DIVISION;
                setOperation(operation);
            } else if (key === KeyBackSpace) {
                backSpace();
            }
        }
    }



    return <div className="Calculator">
        <Display minFont={15} maxFont={60} >{displayValue} </Display>
        <Button label={CharacterEnum.DELETE} double click={clearMemory} />
        <Button label={CharacterEnum.BACK_SPACE} click={backSpace} />
        <Button label={CharacterEnum.DIVISION} operation click={setOperation} />
        <Button label={CharacterEnum.SEVEN} click={addDigit} />
        <Button label={CharacterEnum.EIGHT} click={addDigit} />
        <Button label={CharacterEnum.NINE} click={addDigit} />
        <Button label={CharacterEnum.MULTIPLICATION} operation click={setOperation} />
        <Button label={CharacterEnum.FIVE} click={addDigit} />
        <Button label={CharacterEnum.FOUR} click={addDigit} />
        <Button label={CharacterEnum.SIX} click={addDigit} />
        <Button label={CharacterEnum.SUBTRACTION} operation click={setOperation} />
        <Button label={CharacterEnum.ONE} click={addDigit} />
        <Button label={CharacterEnum.TWO} click={addDigit} />
        <Button label={CharacterEnum.THREE} click={addDigit} />
        <Button label={CharacterEnum.ADD} operation click={setOperation} />
        <Button label={CharacterEnum.ZERO} double click={addDigit} />
        <Button label={CharacterEnum.DOT} click={addDigit} />
        <Button label={CharacterEnum.EQUAL} operation click={setOperation} />
    </div>
}

export default Calculator;