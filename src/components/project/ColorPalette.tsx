import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
interface ColorPaletteProps {
  colors: Array<{
    name: string;
    color: string;
  }>;
}
export function ColorPalette({
  colors
}: ColorPaletteProps) {
  const paletteRef = useAnimateOnScroll<HTMLDivElement>();
  return <div ref={paletteRef} className="animate-on-scroll opacity-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {colors.map((color, index) => <div key={index} className="flex flex-col items-center bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1" style={{
        animationDelay: `${index * 100}ms`
      }}>
            <div className="w-full h-24 transition-transform duration-300 hover:scale-105" style={{
          backgroundColor: color.color
        }}></div>
            <div className="p-3 text-center w-full">
              <h4 className="font-medium text-slate-800">{color.name}</h4>
              <p className="text-sm text-slate-500">{color.color}</p>
            </div>
          </div>)}
      </div>
    </div>;
}