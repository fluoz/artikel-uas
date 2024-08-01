import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: JSX.Element | string;
  endAdornment?: JSX.Element | string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startAdornment, endAdornment, ...props }, ref) => {
    const hasAdornment = Boolean(startAdornment) || Boolean(endAdornment);
    return (
      <>
        {hasAdornment ? (
          <div
            className="ring-offset-background flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-transparent px-3 transition-all duration-300 ease-in-out  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50"
            data-disabled={props.disabled}
          >
            {startAdornment && (
              <div
                className={cn(
                  "!text-muted-foreground",
                  typeof startAdornment === "string" &&
                    "bg-muted/70 border-input border-r pr-3 text-sm"
                )}
              >
                {startAdornment}
              </div>
            )}
            <input
              type={type}
              className={cn(
                "flex h-full w-full rounded-md border-none bg-transparent py-2 text-sm shadow-none outline-none file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none",
                className
              )}
              ref={ref}
              {...props}
            />
            {endAdornment && (
              <div className={cn("text-muted-foreground")}>{endAdornment}</div>
            )}
          </div>
        ) : (
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all duraiton-300 ease-in-out",
              className
            )}
            ref={ref}
            {...props}
          />
        )}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
{
  /* <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all duraiton-300 ease-in-out",
          className
        )}
        ref={ref}
        {...props}
      /> */
}
