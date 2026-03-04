import imgScreen5 from "figma:asset/285d43c217c9dd552b6e004990009775ef8faa79.png";
import imgScreen4 from "figma:asset/1704b18b0ee120ed1e96280be9c6fd880c309270.png";
import imgScreen3 from "figma:asset/212d3bca770f06a9aab2e3196739318412cb977c.png";
import imgScreen2 from "figma:asset/50ed061de3498f876e3fb68d7d1b7d3a274515d1.png";
import imgScreen1 from "figma:asset/24f27649a983ec0e40cbe53f4c81e08495fb75d4.png";

export default function ScreenPreview() {
  return (
    <div className="bg-[#e4e5f5] relative size-full" data-name="Screen Preview">
      <div className="absolute h-[747px] left-[1580px] top-[76px] w-[345px]" data-name="Screen 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScreen5} />
      </div>
      <div className="absolute h-[747px] left-[1195px] top-[76px] w-[345px]" data-name="Screen 4">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScreen4} />
      </div>
      <div className="absolute h-[747px] left-[810px] top-[76px] w-[345px]" data-name="Screen 3">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScreen3} />
      </div>
      <div className="absolute h-[747px] left-[425px] top-[76px] w-[345px]" data-name="Screen 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScreen2} />
      </div>
      <div className="absolute h-[747px] left-[40px] top-[76px] w-[345px]" data-name="Screen 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScreen1} />
      </div>
    </div>
  );
}