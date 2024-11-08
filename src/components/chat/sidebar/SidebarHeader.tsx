import { MdDehaze, MdSearch, MdClear } from "react-icons/md";
import { useState } from "react";
import {
  Settings as SettingsIcon,
  MoonStar as MoonStarIcon,
  Bug as BugIcon,
  CodeXml as CodeIcon,
  BriefcaseBusiness as BriefcaseIcon,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

const SidebarHeader = () => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);
  const [toggleDarkMode, setToggleDarkMode] = useState<boolean>(false);

  return (
    <div className="px-4 py-2 flex gap-4 w-full border-b dark:border-[#121212]/70 border-text-faded-gray pb-4">
      <div className="relative" onMouseLeave={() => setDisplayDropdown(false)}>
        <div
          className="rounded-full p-2 flex items-center justify-center cursor-pointer transition-colors focus:border dark:hover:bg-white/10 hover:bg-black/5 dark:active:bg-white/20 active:bg-black/10"
          onClick={() => setDisplayDropdown((prev) => !prev)}
        >
          <MdDehaze
            size="1.5em"
            className="dark:text-faded-gray text-primary-dark/80"
          />
        </div>

        <div
          className={`z-10 absolute shadow-lg ${displayDropdown ? "scale-100 origin-top-left transition" : "scale-0"} w-[220px] px-1 py-2 dark:bg-[#242425]/50 backdrop-blur-2xl backdrop-saturate-150 rounded-lg bg-primary-light border border-black/20`}
        >
          <div className="flex items-center gap-4 px-4 py-1 mb-2 rounded transition-colors dark:hover:bg-white/5 hover:bg-black/5 dark:active:bg-white/10 active:bg-black/10  cursor-pointer">
            <SettingsIcon
              className="dark:text-white text-primary-dark/80"
              size={19}
            />
            <span className="text-[15px] font-medium">Settings</span>
          </div>
          <div className="flex items-center gap-4 px-4 py-1 mb-2 rounded transition-colors dark:hover:bg-white/5 hover:bg-black/5 dark:active:bg-white/10 active:bg-black/10  cursor-pointer">
            <MoonStarIcon
              size={19}
              className="dark:text-white text-primary-dark/80"
            />
            <div className="flex-1">
              <label
                htmlFor="theme-toggler"
                className="cursor-pointer flex justify-between"
              >
                <span className="text-[15px] font-medium">Dark Mode</span>

                <Switch
                  id="theme-toggler"
                  checked={toggleDarkMode}
                  onCheckedChange={() => {
                    setToggleDarkMode((prev) => {
                      localStorage.setItem("theme", !prev + "");
                      return !prev;
                    });
                  }}
                  className={`dark:!bg-secondary-dark !bg-secondary-light`}
                />
              </label>
            </div>
          </div>
          <div className="flex items-center gap-4 px-4 py-1 mb-2 rounded transition-colors dark:hover:bg-white/5 hover:bg-black/5 dark:active:bg-white/10 active:bg-black/10  cursor-pointer">
            <BugIcon
              size={19}
              className="dark:text-white text-primary-dark/80"
            />
            <span className="text-[15px] font-medium">Report a bug</span>
          </div>
          <div className="flex items-center gap-4 px-4 py-1 mb-2 rounded transition-colors dark:hover:bg-white/5 hover:bg-black/5 dark:active:bg-white/10 active:bg-black/10  cursor-pointer">
            <CodeIcon
              size={19}
              className="dark:text-white text-primary-dark/80"
            />
            <span className="text-[15px] font-medium">Source Code</span>
          </div>
          <div className="flex items-center gap-4 px-4 py-1 mb-2 rounded transition-colors dark:hover:bg-white/5 hover:bg-black/5 dark:active:bg-white/10 active:bg-black/10  cursor-pointer">
            <BriefcaseIcon
              size={19}
              className="dark:text-white text-primary-dark/80"
            />
            <span className="text-[15px] font-medium">Hire Me</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2">
          <MdSearch size="1.5em" className="text-faded-gray" />
        </span>
        <input
          type="input"
          placeholder="Search"
          className="w-full rounded-3xl p-[8px] !pe-12 ps-[45px] focus:ps-[44px] focus:p-[7px] text-[16px] outline-none dark:bg-[#181818] dark:text-white text-primary-dark placeholder:text-[#646464] border dark:border-[#2f2f2f] bg-white dark:hover:border-faded-gray transition-colors border-[#AAA] dark:focus:border-secondary-dark hover:border-secondary-light focus:border-secondary-light focus:border-2"
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.target.value)}
          required
        />
        <span
          className={`absolute right-3 top-1/2 -translate-y-1/2 ${searchPhrase ? "block" : "hidden"} rounded-full p-1 cursor-pointer transition-colors dark:hover:bg-white/10 dark:active:bg-white/20 hover:bg-black/5 active:bg-black/10`}
          onClick={() => setSearchPhrase("")}
        >
          <MdClear
            size="1.5em"
            className="dark:text-faded-gray text-primary-dark"
          />
        </span>
      </div>
    </div>
  );
};

export default SidebarHeader;
