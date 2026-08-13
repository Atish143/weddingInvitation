"use client";

import type { ReactNode } from "react";
import { ScrollProvider, useScrollRoot } from "@/lib/ScrollContext";
import { LanguageProvider } from "@/lib/i18n";
import { MusicProvider } from "@/lib/MusicContext";
import { MusicToggle } from "@/components/MusicToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SectionNav } from "@/components/SectionNav";

function ShellInner({ children }: { children: ReactNode }) {
  const { scrollRef } = useScrollRoot();

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-ivory">
      <div className="pointer-events-none fixed right-3 top-3 z-50 flex items-center gap-2 sm:right-5 sm:top-5">
        <div className="pointer-events-auto">
          <LanguageSwitcher />
        </div>
        <div className="pointer-events-auto">
          <MusicToggle />
        </div>
      </div>
      <SectionNav />
      <div
        ref={scrollRef}
        id="wedding-scroll-root"
        className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden snap-y snap-proximity scroll-smooth"
      >
        {children}
      </div>
    </div>
  );
}

export function ScrollSnapShell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <MusicProvider>
        <ScrollProvider>
          <ShellInner>{children}</ShellInner>
        </ScrollProvider>
      </MusicProvider>
    </LanguageProvider>
  );
}
