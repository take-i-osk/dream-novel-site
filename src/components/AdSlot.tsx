import { ads, type AdPlacement } from "@/data/ads";

type AdSlotProps = {
  placement: AdPlacement;
  className?: string;
};

export function AdSlot({ placement, className = "" }: AdSlotProps) {
  const ad = ads[placement];

  return (
    <div className={`ad-slot ${className}`.trim()} aria-label="広告">
      <a href={ad.href} rel="nofollow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={ad.width} height={ad.height} alt="" src={ad.imageSrc} />
      </a>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img width={1} height={1} src={ad.trackingSrc} alt="" />
    </div>
  );
}
