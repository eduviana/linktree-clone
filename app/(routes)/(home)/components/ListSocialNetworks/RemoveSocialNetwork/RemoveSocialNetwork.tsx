import { useState } from "react";
import { RemoveSocialNetworkProps } from "./RemoveSocialNetwork.types";
import { useUserInfo } from "@/hooks/useUser";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export function RemoveSocialNetwork(props: RemoveSocialNetworkProps) {
  const { linkId, onReload } = props;
  const [showDialog, setShowDialog] = useState(false);

  const { reloadUser } = useUserInfo();

  const onDelete = async () => {
    await axios.delete(`/api/social-network/${linkId}`);
    onReload(true);
    setShowDialog(false);
    reloadUser();
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete social network</DialogTitle>
          <div className="flex flex-col gap-4 mt-4">
            <Button
              className="w-full bg-violet-600 text-white rounded-full"
              onClick={onDelete}
            >
              Delete
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-full"
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
