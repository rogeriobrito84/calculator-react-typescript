import { PropsWithChildren, useEffect, useRef } from "react";
import "./Display.css";

type DisplayProps = {
    maxFont: number;
    minFont: number;
};

let font: number = 1;

const Display = (props: PropsWithChildren<DisplayProps>) => {
    const display = useRef(null);
    const displayInput = useRef(null);

    useEffect(() => {
        window.addEventListener("resize", resizeEvent);
        font = props.maxFont;
    }, []);

    useEffect(() => {
        resizeEvent();
    }, [props.children]);

    const getWith = (display: HTMLElement, input: HTMLElement): [wDisplay: number, wInput: number] => {
        const widthDisplay = display.offsetWidth;
        const widthInput = input.offsetWidth + 50;
        return [widthDisplay, widthInput];
    }

    const resizeEvent = () => {
        if (displayInput.current && display.current) {
            const divDisplay: HTMLElement = display.current;
            const divInput: HTMLElement = displayInput.current;
            let [wDisplay, wInput] = getWith(divDisplay, divInput);

            const fontCurrent = divInput.style.fontSize;
            if (fontCurrent) font = parseInt(fontCurrent.replaceAll(/\D/g, ""));


            while (wInput > wDisplay && font > props.minFont) {
                font -= 1;
                divInput.style.fontSize = `${font}px`;
                [wDisplay, wInput] = getWith(divDisplay, divInput);
            }

            while (wDisplay > wInput && font < props.maxFont) {
                font += 1;
                divInput.style.fontSize = `${font}px`;
                [wDisplay, wInput] = getWith(divDisplay, divInput);
            }
        }

    }

    return <div className="Display" ref={display}>
        <div className="InputDisplay" ref={displayInput}>
            {props.children}

        </div>
    </div>
}

export default Display;