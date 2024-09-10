"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

const Toggle = ({ className }) => {
  const [darke, setDark] = useState(true);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={() => {
            setDark(!darke);
            document.body.classList.toggle("dark");
          }}
          className={className}
        >
          {darke ? <Moon></Moon> : <Sun></Sun>}
        </TooltipTrigger>
        <TooltipContent>
          {darke ? "Enable light mode" : "Enable dark mode"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Toggle;
