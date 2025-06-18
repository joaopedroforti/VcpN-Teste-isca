import { FaCheck } from "react-icons/fa";

interface StepperProps {
  step: number;
}

export const Stepper = ({ step }: StepperProps) => (
  <ul className="flex items-center justify-between relative mx-10 before:content-[''] before:h-[3px] before:w-full before:absolute before:left-0 before:right-0 before:bg-purple-600">
    {[0, 1, 2, 3, 4].map((i) => (
      <li key={i}>
        {i <= step ? (
          <span className="flex items-center justify-center bg-purple-600 h-6 w-6 text-white rounded-full relative z-10">
            <FaCheck className="size-3" />
          </span>
        ) : (
          <span className="flex bg-white h-6 w-6 border-[3px] border-purple-600 rounded-full relative z-10" />
        )}
      </li>
    ))}
  </ul>
);
