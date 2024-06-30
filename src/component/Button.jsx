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

const colorButton = {
  white: "text-[#FFFFFF]",
  black: "text-[#0D1618]",
  gray: "text-[#40565C]",
};

const widthButton = {
  32: "w-32",
  full: "w-full",
  20: "w-20",
};

const hButton = {
  h10: "h-10",
  h12: "h-12",
};

export default function Button({
  children,
  bg = "blue",
  border = "none",
  color = "black",
  width,
  onClick,
  type,
  height,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-full ${bgButton[bg]} ${borderButton[border]} ${colorButton[color]} ${widthButton[width]} ${hButton[height]}`}
    >
      {children}
    </button>
  );
}
