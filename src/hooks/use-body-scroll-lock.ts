import { useEffect } from "react";

import { lockBodyScroll } from "@/helpers/utils/lock-body-scroll";

export function useBodyScrollLock(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const unlock = lockBodyScroll();
    return () => unlock();
  }, [enabled]);
}

