"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    const radius = 100; // change this to increase the radius of the hover effect
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          #ff9239,
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-lg p-[2px] transition duration-300"
      >
       <input
  type={type}
  className={cn(
    `shadow-input flex h-10 w-full rounded-md 
     border border-[#f1c1a3] bg-[#fef8f7] 
     px-3 py-2 text-sm text-black transition duration-400 
     group-hover/input:shadow-none 
     file:border-0 file:bg-transparent file:text-sm file:font-medium 
     placeholder:text-neutral-400 
     focus-visible:ring-[0px] focus-visible:ring-neutral-400 focus-visible:outline-none 
     disabled:cursor-not-allowed disabled:opacity-50`,
    className,
  )}
  ref={ref}
  {...props}
/>

      </motion.div>
    );
  },
);
Input.displayName = "Input";

export { Input };
