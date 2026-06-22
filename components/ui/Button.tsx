import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "white";
  size?: "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", className = "", ...props }, ref) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-btn transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-blue/80 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

    // Size variants
    const sizes = {
      md: "h-[44px] px-6 text-sm",
      lg: "h-[52px] px-8 text-base",
    };

    // Style variants
    const variants = {
      primary:
        "bg-primary-blue text-white hover:brightness-110 hover:shadow-soft",
      secondary:
        "border-[1.5px] border-dark-navy text-dark-navy hover:bg-dark-navy hover:text-white",
      ghost:
        "bg-transparent text-primary-blue hover:bg-primary-blue/10",
      danger:
        "bg-error text-white hover:bg-error/90",
      white:
        "bg-white text-dark-navy hover:bg-[#F8FAFC] shadow-soft",
    };

    const combinedClassName = `${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`;

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
