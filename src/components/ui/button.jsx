import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = ({ variant = "default", size = "default", className = "" }) => {
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 shadow-sm cursor-pointer";
  
  const variants = {
    default: "bg-blue-900 text-white hover:bg-blue-800 font-semibold",
    destructive: "bg-red-600 text-white hover:bg-red-700 font-semibold",
    outline: "border border-blue-950 bg-white text-blue-950 hover:bg-blue-50 font-bold",
    outlineDark: "border-2 border-white bg-blue-900/70 text-white hover:bg-white hover:text-blue-950 font-bold",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 font-semibold",
    ghost: "hover:bg-accent hover:text-accent-foreground shadow-none font-medium",
    link: "text-primary underline-offset-4 hover:underline shadow-none font-medium",
    yellow: "bg-yellow-500 text-blue-950 font-bold hover:bg-yellow-400",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-12 rounded-md px-8 text-base",
    icon: "h-10 w-10",
  };

  return cn(base, variants[variant] || variants.default, sizes[size] || sizes.default, className);
};

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={buttonVariants({ variant, size, className })}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
