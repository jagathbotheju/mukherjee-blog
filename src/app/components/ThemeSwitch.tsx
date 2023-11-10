"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { ImSun } from "react-icons/im";
import { RiMoonFill } from "react-icons/ri";

const ThemeSwitch = () => {
  const [init, setInit] = useState(false);
  const [theme, setTheme] = useState<string | null>();

  useEffect(() => {
    setInit(true);
    const localTheme = localStorage.getItem("theme") ?? "light";
    localStorage.setItem("theme", localTheme ?? "light");
    setTheme(localTheme);
    document.querySelector("html")?.setAttribute("data-theme", localTheme);
  }, [theme]);

  useEffect(() => {
    console.log("setting local theme");
    const localTheme = localStorage.getItem("theme") ?? "light";
    setTheme(localTheme);
    console.log("localTheme", localTheme);
  }, []);

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  console.log("theme", theme);

  return (
    <div>
      <label className="swap swap-rotate">
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" onChange={handleToggle} />

        {/* sun icon */}
        <div className="flex gap-2">
          <ImSun className="swap-on fill-current w-5 h-5" />
          <p className={`${theme === "light" && "hidden"}`}>Light Theme</p>
        </div>

        {/* moon icon */}
        <div className="flex gap-2">
          <RiMoonFill className="swap-off fill-current w-5 h-5" />
          <p className={`${theme === "dark" && "hidden"}`}>Dark Theme</p>
        </div>
      </label>
    </div>
  );
};

export default ThemeSwitch;
