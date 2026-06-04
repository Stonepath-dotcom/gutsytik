import { AdUnit } from "./ad-unit";

/**
 * In-article ad unit.
 * Place between content sections in blog posts and articles.
 * Uses auto-ads when no slot ID is configured.
 * Replace slot with your actual AdSense slot ID after creating ad units in AdSense dashboard.
 */
export function InArticleAd() {
  return (
    <div className="my-8 py-4 border-t border-b border-border">
      <div className="text-center text-xs text-muted-foreground/50 mb-2">Advertisement</div>
      <AdUnit slot="middle" className="min-h-[100px]" />
    </div>
  );
}
