import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

interface ColorPaletteProps {
  colors: Array<{
    name: string;
    color?: string;
    hex?: string;
    usage?: string;
  }>;
}

export function ColorPalette({
  colors
}: ColorPaletteProps) {
  const paletteRef = useAnimateOnScroll<HTMLDivElement>();

  return <div ref={paletteRef} className="animate-on-scroll opacity-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {colors.map((color, index) => {
          const colorValue = color.hex || color.color || '';
          return <div key={index} className="flex flex-col items-center bg-white dark:bg-slate-900 rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-slate-200 dark:border-slate-800" style={{
            animationDelay: `${index * 100}ms`
          }}>
            <div className="w-full h-24 transition-transform duration-300 hover:scale-105" style={{
              backgroundColor: colorValue
            }}></div>
            <div className="p-3 text-center w-full">
              <h4 className="font-medium text-slate-800 dark:text-slate-200 transition-colors duration-300">{color.name}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">{colorValue}</p>
              {color.usage && <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 transition-colors duration-300">{color.usage}</p>}
            </div>
          </div>;
        })}
      </div>
    </div>;
}