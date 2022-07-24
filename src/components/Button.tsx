import { PropsWithChildren } from "react";
import "./Button.css";

type ButtonPropos = {
    label?: string;
    operation?: boolean;
    double?: boolean;
    tripe?: boolean;
    click?(label?: string): void;
}

const Button = (props: PropsWithChildren<ButtonPropos>) => {
    let cls = "button Animate ";
    cls += props.operation ? "operation" : "";
    cls += props.double ? "double " : ""
    cls += props.tripe ? "tripe " : ""

    return <button className={cls}
        onClick={() => props.click && props.click(props.label)} >
        {props.label} </button>
}

export default Button;