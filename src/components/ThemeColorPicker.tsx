import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ThemeColors } from "@/lib/landing-store";

const PRESET_THEMES: Record<string, ThemeColors> = {
  default: {
    primaryColor: "#ff6b35",
    accentColor: "#ff6b35",
    backgroundColor: "#0a0e27",
    textColor: "#f5f5f5",
    mutedColor: "#7a8b99",
  },
  ocean: {
    primaryColor: "#0084ff",
    accentColor: "#00d4ff",
    backgroundColor: "#001a33",
    textColor: "#e6f2ff",
    mutedColor: "#66b3ff",
  },
  forest: {
    primaryColor: "#10b981",
    accentColor: "#34d399",
    backgroundColor: "#051b15",
    textColor: "#d1fae5",
    mutedColor: "#6ee7b7",
  },
  sunset: {
    primaryColor: "#f97316",
    accentColor: "#fb923c",
    backgroundColor: "#3f1f0b",
    textColor: "#fed7aa",
    mutedColor: "#fdba74",
  },
  purple: {
    primaryColor: "#a855f7",
    accentColor: "#c084fc",
    backgroundColor: "#2e1065",
    textColor: "#e9d5ff",
    mutedColor: "#d8b4fe",
  },
  dark: {
    primaryColor: "#ef4444",
    accentColor: "#f87171",
    backgroundColor: "#1f2937",
    textColor: "#f3f4f6",
    mutedColor: "#9ca3af",
  },
};

export function ThemeColorPicker({
  theme,
  onThemeChange,
}: {
  theme: ThemeColors;
  onThemeChange: (theme: ThemeColors) => void;
}) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    onThemeChange({
      ...theme,
      [key]: value,
    });
  };

  const applyPreset = (preset: ThemeColors) => {
    onThemeChange(preset);
  };

  const colorOptions: {
    key: keyof ThemeColors;
    label: string;
    description: string;
  }[] = [
    { key: "primaryColor", label: "Primary Color", description: "Warna tombol dan elemen utama" },
    { key: "accentColor", label: "Accent Color", description: "Warna highlight dan aksen" },
    { key: "backgroundColor", label: "Background", description: "Warna latar belakang" },
    { key: "textColor", label: "Text Color", description: "Warna teks utama" },
    { key: "mutedColor", label: "Muted Color", description: "Warna teks yang lebih lembut" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
          Preset Themes
        </h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          {Object.entries(PRESET_THEMES).map(([name, preset]) => (
            <button
              key={name}
              onClick={() => applyPreset(preset)}
              className="group relative h-12 rounded-lg border border-border transition-all hover:border-primary hover:scale-105"
              style={{
                backgroundColor: preset.backgroundColor,
              }}
              title={name.charAt(0).toUpperCase() + name.slice(1)}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-xs font-semibold text-white capitalize">{name}</span>
              </div>
              <div className="flex h-full gap-1 px-1 py-1">
                <div
                  className="h-full w-1 rounded-sm"
                  style={{ backgroundColor: preset.primaryColor }}
                />
                <div
                  className="h-full w-1 rounded-sm"
                  style={{ backgroundColor: preset.accentColor }}
                />
                <div
                  className="h-full w-1 rounded-sm"
                  style={{ backgroundColor: preset.textColor }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="text-sm uppercase tracking-wider text-muted-foreground mb-4 hover:text-foreground transition-colors font-medium"
        >
          {showColorPicker ? "Hide Custom Colors ×" : "Show Custom Colors ↓"}
        </button>

        {showColorPicker && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {colorOptions.map(({ key, label, description }) => (
              <div key={key} className="space-y-2">
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                    {label}
                  </Label>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <div className="flex gap-2">
                  <div
                    className="h-10 w-10 rounded-lg border border-border cursor-pointer transition-transform hover:scale-110"
                    style={{ backgroundColor: theme[key] }}
                    onClick={() => {
                      const input = document.getElementById(`color-${key}`) as HTMLInputElement;
                      input?.click();
                    }}
                  />
                  <Input
                    id={`color-${key}`}
                    type="color"
                    value={theme[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-full h-10 cursor-pointer"
                  />
                </div>
                <Input
                  type="text"
                  value={theme[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  placeholder="#000000"
                  className="text-xs font-mono"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
