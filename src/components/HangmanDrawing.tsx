import {HangmanDrawingProps} from "../types";

export default function HangmanDrawing({ wrongGuesses = 10 }: HangmanDrawingProps) {
    const parts = [
        <path d="M1,11 h8" key="base" />,
        <path d="M9,11 v-10" key="vertical" />,
        <path d="M9,1 h-4" key="top" />,
        <path d="M5,1 v2" key="rope" />,
        <circle cx="5" cy="4" r="1" key="head" />,
        <path d="M5,5 v3" key="body" />,
        <path d="M5,5 l-2,2" key="left-arm" />,
        <path d="M5,5 l2,2" key="right-arm" />,
        <path d="M5,8 l-2,2" key="left-leg" />,
        <path d="M5,8 l2,2" key="right-leg" />,
    ];

    return (
        <svg viewBox="0 0 10 12" className="w-24 h-32">
            {parts.map((element, index) => (
                <g
                    key={index}
                    className={`stroke-black stroke-[0.25] fill-none ${
                        wrongGuesses > index ? 'block' : 'hidden'
                    }`}
                >
                    {element}
                </g>
            ))}
        </svg>
    );
}
