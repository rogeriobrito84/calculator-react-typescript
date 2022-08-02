import { PropsWithChildren, ReactNode, useEffect, useRef } from "react";
import "./Display.css";

type DisplayProps = {
  maxFont: number;
  minFont: number;
};

let font = 1;

const Display = (props: PropsWithChildren<DisplayProps>) => {
  const display = useRef(null);
  const displayInput = useRef(null);

  useEffect(() => {
    font = props.maxFont;
    let [min, max] = [0, 0];

    const setWidthDisplay = (maxFont: number, minFont: number) => {

      if (displayInput.current && display.current) {
        const divDisplay: HTMLElement = display.current;
        const divInput: HTMLElement = displayInput.current;
        let [wDisplay, wInput] = getWith(divDisplay, divInput);

        const fontCurrent = divInput.style.fontSize;
        if (fontCurrent) font = parseInt(fontCurrent.replaceAll(/\D/g, ""));


        while (wInput > wDisplay && font > minFont) {
          font -= 1;
          divInput.style.fontSize = `${font}px`;
          [wDisplay, wInput] = getWith(divDisplay, divInput);
        }

        while (wDisplay > wInput && font < maxFont) {
          font += 1;
          divInput.style.fontSize = `${font}px`;
          [wDisplay, wInput] = getWith(divDisplay, divInput);
        }
      }

    };

    if (max != props.maxFont && max != props.minFont) {
      window.addEventListener("resize", () => {
        setWidthDisplay(props.maxFont, props.minFont);
      });
      max = props.maxFont;
      min = props.minFont;
    }

    setWidthDisplay(max, min);

    return () => {
      window.removeEventListener("resize", () => {
        setWidthDisplay(props.maxFont, props.minFont);
      });
    };

  }, [props.maxFont, props.minFont, props.children]);

  const getWith = (display: HTMLElement, input: HTMLElement): [wDisplay: number, wInput: number] => {
    const widthDisplay = display.offsetWidth;
    const widthInput = input.offsetWidth + 50;
    return [widthDisplay, widthInput];
  };



  return <div className="Display" ref={display}>
    <div className="InputDisplay" ref={displayInput}>
      {props.children}

    </div>
  </div>;
};

export default Display;