import { AdUnit } from "./ad-unit";

export function SidebarAd() {
  return (
    <div className="sticky top-20">
      <AdUnit slot="TODO_REPLACE_WITH_AD_SLOT_ID" format="rectangle" style={{ display: "block", minHeight: "250px" }} className="rounded-lg overflow-hidden" />
    </div>
  );
}
