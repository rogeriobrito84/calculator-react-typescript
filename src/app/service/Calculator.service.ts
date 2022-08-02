import { CharacterEnum } from "../enums/CharacterEnum";

export class CalculatorService {

  private readonly NOT_DIVISION_ZERO: string = "Não é possível dividir por zero"; 
  private valules: Array<string> = [];
  private operation = "";
  private clearDisplay = false;
  private static service: CalculatorService = new CalculatorService();

  private constructor() {/*Constructor Empty*/}
  public static getInstance(): CalculatorService {
    return this.service;
  }

  private calcValues(): string {
    let result = 0;
    try {
      const valor1 = parseFloat(this.valules[0]);
      const valor2 = parseFloat(this.valules[1]);
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
    displayValue = this.commaToDot(displayValue);
    if (this.clearDisplay) {
      if (displayValue === this.NOT_DIVISION_ZERO) this.valules = [];
      displayValue = CharacterEnum.ZERO;
      this.clearDisplay = false;
    }

    if ((digit === CharacterEnum.ZERO) && displayValue === CharacterEnum.ZERO) return CharacterEnum.ZERO;
    if ((digit === CharacterEnum.COMMA) && displayValue === CharacterEnum.ZERO) return CharacterEnum.ZERO + CharacterEnum.COMMA;
    if (displayValue.includes(CharacterEnum.COMMA) && digit === CharacterEnum.COMMA) return displayValue;
    if (displayValue === CharacterEnum.ZERO) return digit;

    displayValue += digit;
    return this.dotToComma(displayValue);
  }

  public setDisplayOperation(displayValue: string, operation: string): string {
    displayValue = this.commaToDot(displayValue);
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
    return this.dotToComma(displayValue);
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

  private commaToDot(text: string) {
    return text.replace(CharacterEnum.COMMA, CharacterEnum.DOT);
  }

  private dotToComma(text: string) {
    return text.replace(CharacterEnum.DOT, CharacterEnum.COMMA);
  }



}