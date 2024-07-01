const bgButton = {
  blue: "bg-[#415F6C]",
  yellow: "bg-[#E7FE59]",
  lightYellow: "bg-[#FDFFEE]",
  red: "bg-[#F86158]",
  lightBlue: "bg-[#E5ECF0]",
};

const borderButton = {
  yellow: "border-solid border-2 border-[#C1D547]",
  blue: "border-solid border-2 border-[#415F6C]",
};

const textColor = {
  white: "text-[#FFFFFF]",
  black: "text-[#0D1618]",
  gray: "text-[#40565C]",
};

export default function Button({
  children,
  bg = "blue",
  border,
  color = "black",
  width,
  onClick,
  type,
  height,
  fontSize = "text-base",
  fontWeight = "font-normal",
}) {
  const widthClass = width ? `w-[${width}px]` : "";
  const heightClass = height ? `h-[${height}px]` : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-full ${bgButton[bg]} ${
        border ? borderButton[border] : ""
      } ${widthClass} ${heightClass} ${
        textColor[color]
      } ${fontSize} ${fontWeight}`}
    >
      {children}
    </button>
  );
}
