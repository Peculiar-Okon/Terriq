export function TerrIQLogo({
  dark = false,
}: {
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="28"
          height="28"
          rx="8"
          fill={dark ? "#F5F3ED" : "#23483A"}
        />

        <path
          d="M8 10h14M15 10v11"
          stroke={dark ? "#23483A" : "#F5F3ED"}
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M10 21c1.5-3 4-4.5 7.5-4.5"
          stroke={dark ? "#B66A45" : "#B66A45"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <span
        className={`text-[18px] font-semibold tracking-[-0.03em] ${
          dark ? "text-[#F5F3ED]" : "text-[#171A17]"
        }`}
      >
        Terr<span className="text-[#B66A45]">IQ</span>
      </span>
    </div>
  );
}