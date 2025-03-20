import { ChevronLeft } from "lucide-react";
import { TabDeleteImageProps } from "./TabDeleteImage.types";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useUserInfo } from "@/hooks/useUser";

export function TabDeleteImage(props: TabDeleteImageProps) {
  const { setShowDialog, setShowTab } = props;
  const { reloadUser } = useUserInfo();

  const onRemoveImage = async () => {
    await axios.patch("/api/update-user", {
    //   avatarUrl:"https://wb80ftx970.ufs.sh/f/a6OjBLe4rXuUvdD3UtVQdS8paJMB0YUbZgOnlIkDWE61ejco",
    avatarUrl: "https://utfs.io/f/a6OjBLe4rXuUvdD3UtVQdS8paJMB0YUbZgOnlIkDWE61ejco"
    });
    setShowDialog(false);
    toast("Profile image deleted");
    reloadUser();
  };

  return (
    <div>
      <div
        className="flex gap-1 items-center text-sm cursor-pointer hover:bg-slate-100 p-1 w-fit rounded-lg"
        onClick={() => setShowTab(null)}
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <Button
          className="bg-violet-600 text-white rounded-full"
          onClick={onRemoveImage}
        >
          Yes, remove
        </Button>

        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => setShowTab(null)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
