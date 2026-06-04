import { AdUnit } from "./ad-unit";

/**
 * Sidebar ad unit.
 * Place in sidebar or alongside article content.
 * Uses auto-ads when no slot ID is configured.
 * Replace slot with your actual AdSense slot ID after creating ad units in AdSense dashboard.
 */
export function SidebarAd() {
  return (
    <div className="sticky top-20">
      <div className="text-center text-xs text-muted-foreground/50 mb-2">Advertisement</div>
      <AdUnit slot="sidebar" className="rounded-lg overflow-hidden" />
    </div>
  );
}
