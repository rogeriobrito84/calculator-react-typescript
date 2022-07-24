import { CharacterEnum } from "../enums/CharacterEnum";

export class CalculatorService {

    private readonly NOT_DIVISION_ZERO: string = "Não é possível dividir por zero";
    private valules: Array<string> = [];
    private operation: string = "";
    private clearDisplay: boolean = false;
    private static service: CalculatorService = new CalculatorService();

    private constructor() { }

    public static getInstance(): CalculatorService {
        return this.service;
    }

    private calcValues(): string {
        let result: number = 0;
        try {
            let valor1 = parseFloat(this.valules[0]);
            let valor2 = parseFloat(this.valules[1]);
            switch (this.operation) {
                case CharacterEnum.ADD:
                    result = valor1 + valor2;
                    break;
                case CharacterEnum.MULTIPLICATION:
                    result = valor1 * valor2;
                    break;
                case CharacterEnum.SUBTRACTION:
                    result = valor1 - valor2;
                    break;
                case CharacterEnum.DIVISION:
                    result = (valor1 === 0) ? 0 : valor1 / valor2;
                    break;
            }
        } catch (e) {
            console.log(e);
        }
        return String(result);
    }

    public getDisplayNumber(displayValue: string, digit: string): string {
        if (this.clearDisplay) {
            if (displayValue === this.NOT_DIVISION_ZERO) this.valules = [];
            displayValue = CharacterEnum.ZERO;
            this.clearDisplay = false;
        }

        if ((digit === CharacterEnum.ZERO) && displayValue === CharacterEnum.ZERO) return CharacterEnum.ZERO;
        if ((digit === CharacterEnum.DOT) && displayValue === CharacterEnum.ZERO) return CharacterEnum.ZERO + CharacterEnum.DOT;
        if (displayValue.includes(CharacterEnum.DOT) && digit === CharacterEnum.DOT) return displayValue;
        if (displayValue === CharacterEnum.ZERO) return digit;

        displayValue += digit;
        return displayValue;
    }

    public setDisplayOperation(displayValue: string, operation: string): string {
        if (displayValue === this.NOT_DIVISION_ZERO) displayValue = this.valules[0];
        if (this.valules.length === 0) {
            this.valules[0] = displayValue;
        } else if (this.valules.length === 1 && !this.clearDisplay) {
            this.valules[1] = displayValue;
        }

        if (this.valules.length === 2) {
            if (this.operation === CharacterEnum.DIVISION && this.valules[1] === "0") {
                this.valules = [this.valules[0]];
                displayValue = this.NOT_DIVISION_ZERO;
            } else if (operation === CharacterEnum.EQUAL) {
                displayValue = this.calcValues();
                this.valules = [displayValue, this.valules[1]];
                operation = this.operation;
            } else {
                if (!this.clearDisplay) displayValue = this.calcValues();
                this.valules = [displayValue];
            }
        }

        this.operation = operation;
        this.clearDisplay = true;
        return displayValue;
    }

    public clearMemoryDisplay(): string {
        this.valules = [];
        this.clearDisplay = false;
        this.operation = "";
        return CharacterEnum.ZERO;
    }

    public backSpace(displayValue: string): string {
        if (displayValue.length === 1) return CharacterEnum.ZERO;
        return displayValue.substring(0, displayValue.length - 1);
    }
}