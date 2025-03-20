import { useState } from "react";
import { SelectorProfileImageProps } from "./SelectorProfileImage.types";
import { Tabselector } from "./TabSelector";
import { TabUploadImage } from "./TabUploadImage";
import { TabDeleteImage } from "./TabDeleteImage";

export function SelectorProfileImage(props: SelectorProfileImageProps) {
  const { setShowDialog } = props;
  const [showTab, setShowTab] = useState<"upload" | "delete" | null>(null);
  return (
    <div className="pt-6">
      {!showTab && <Tabselector setShowTab={setShowTab} />}

      {showTab === "upload" && (
        <TabUploadImage setShowTab={setShowTab} setShowDialog={setShowDialog} />
      )}

      {showTab === "delete" && (
        <TabDeleteImage setShowTab={setShowTab} setShowDialog={setShowDialog} />
      )}
    </div>
  );
}
