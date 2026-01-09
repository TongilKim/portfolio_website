import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

interface VersionSwitcherProps {
  currentVersion: number;
  onSwitch: (version: number) => void;
}

export function VersionSwitcher({ currentVersion, onSwitch }: VersionSwitcherProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-lg shadow-2xl p-4 border-2 border-blue-500">
        <div className="flex items-center gap-3">
          <RefreshCw size={20} className="text-blue-600" />
          <div className="text-sm font-medium">Version {currentVersion}</div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={currentVersion === 1 ? "default" : "outline"}
              onClick={() => onSwitch(1)}
            >
              V1
            </Button>
            <Button
              size="sm"
              variant={currentVersion === 2 ? "default" : "outline"}
              onClick={() => onSwitch(2)}
            >
              V2
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
