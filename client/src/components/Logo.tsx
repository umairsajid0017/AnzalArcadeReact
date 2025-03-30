import { BuildingIcon } from "lucide-react";

export const Logo: React.FC = () => {
  return (
    <div className="h-9 w-9 relative flex items-center justify-center">
      <div className="absolute inset-0 bg-primary/20 rounded-md transform rotate-45"></div>
      <BuildingIcon className="h-5 w-5 text-primary relative z-10" />
    </div>
  );
};