import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { base64ToBuffer, decryptData } from "@/backend/accounts/crypto";
import { UserAvatar } from "@/components/Avatar";
import { Icon, Icons } from "@/components/Icon";
import { Transition } from "@/components/utils/Transition";
import { useAuth } from "@/hooks/auth/useAuth";
import { conf } from "@/setup/config";
import { useAuthStore } from "@/stores/auth";

function Divider() {
  return <hr className="border-0 w-full h-px bg-dropdown-border" />;
}

function GoToLink({
  children,
  href,
  className,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  const navigate = useNavigate();

  const handleNavigation = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (href: string) => {
      if (href.startsWith("http")) {
        window.open(href, "_blank");
      } else {
        window.scrollTo(0, 0);
        navigate(href);
      }
    },
    [navigate],
  );

  const handleClick = (
    evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    evt.preventDefault();
    if (href) handleNavigation(href);
    else onClick?.();
  };

  return (
    <a tabIndex={0} href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

function DropdownLink({
  children,
  href,
  icon,
  highlight,
  className,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  icon?: Icons;
  highlight?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <GoToLink
      onClick={onClick}
      href={href}
      className={classNames(
        "tabbable cursor-pointer flex gap-3 items-center m-3 p-1 rounded font-medium transition-colors duration-100",
        highlight
          ? "text-dropdown-highlight hover:text-dropdown-highlightHover"
          : "text-dropdown-text hover:text-white",
        className,
      )}
    >
      {icon && <Icon icon={icon} className="text-xl" />}
      {children}
    </GoToLink>
  );
}

function CircleDropdownLink({ icon, href }: { icon: Icons; href: string }) {
  return (
    <GoToLink
      href={href}
      className="tabbable w-11 h-11 rounded-full bg-dropdown-contentBackground text-dropdown-text hover:text-white transition-colors duration-100 flex justify-center items-center"
    >
      <Icon className="text-2xl" icon={icon} />
    </GoToLink>
  );
}

export function LinksDropdown({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const deviceName = useAuthStore((s) => s.account?.deviceName);
  const seed = useAuthStore((s) => s.account?.seed);
  const bufferSeed = useMemo(
    () => (seed ? base64ToBuffer(seed) : null),
    [seed],
  );
  const { logout } = useAuth();

  const handleWindowClick = useCallback((evt: MouseEvent) => {
    if (!(evt.target as HTMLElement).closest(".is-dropdown")) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, [handleWindowClick]);

  const toggleDropdown = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative is-dropdown">
      <div
        className="cursor-pointer tabbable rounded-full flex gap-2 text-white items-center py-2 px-3 bg-pill-background bg-opacity-50 hover:bg-pill-backgroundHover backdrop-blur-lg transition-[background,transform] duration-100 hover:scale-105"
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyUp={(evt) => evt.key === "Enter" && toggleDropdown()}
      >
        {children}
        <Icon
          className={classNames(
            "text-xl transition-transform duration-100",
            open && "rotate-180",
          )}
          icon={Icons.CHEVRON_DOWN}
        />
      </div>
      <Transition animation="slide-down" show={open}>
        <div className="rounded-lg absolute w-64 bg-dropdown-altBackground top-full mt-3 right-0">
          {deviceName && bufferSeed ? (
            <DropdownLink className="text-white" href="/settings">
              <UserAvatar />
              {decryptData(deviceName, bufferSeed)}
            </DropdownLink>
          ) : (
            <DropdownLink href="/login" icon={Icons.RISING_STAR} highlight>
              {t("navigation.menu.register")}
            </DropdownLink>
          )}
          <Divider />
          <DropdownLink href="/settings" icon={Icons.SETTINGS}>
            {t("navigation.menu.settings")}
          </DropdownLink>
          <DropdownLink href="/about" icon={Icons.CIRCLE_QUESTION}>
            {t("navigation.menu.about")}
          </DropdownLink>
          <DropdownLink href="/discover" icon={Icons.RISING_STAR}>
            {t("navigation.menu.discover")}
          </DropdownLink>
          {deviceName && (
            <DropdownLink
              className="!text-type-danger opacity-75 hover:opacity-100"
              icon={Icons.LOGOUT}
              onClick={logout}
            >
              {t("navigation.menu.logout")}
            </DropdownLink>
          )}
          <Divider />
          <div className="my-4 flex justify-center items-center gap-4">
            <CircleDropdownLink
              href={conf().DISCORD_LINK}
              icon={Icons.DISCORD}
            />
            <CircleDropdownLink href={conf().GITHUB_LINK} icon={Icons.GITHUB} />
            <CircleDropdownLink
              href={conf().TWITTER_LINK}
              icon={Icons.TWITTER}
            />
            <CircleDropdownLink href="/support" icon={Icons.MAIL} />
          </div>
        </div>
      </Transition>
    </div>
  );
}
