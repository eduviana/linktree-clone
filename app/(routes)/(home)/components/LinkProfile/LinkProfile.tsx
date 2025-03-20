// "use client";

// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// export function LinkProfile() {
//   const [isCopiedLink, setIsCopiedLink] = useState(false);

//   const copyLink = () => {
//     const url = `${window.location.origin}/edudevtest`;
//     navigator.clipboard.writeText(url);
//     setIsCopiedLink(true);
//   };

//   return (
//     <div className="bg-indigo-100 rounded-3xl">
//       <div className="flex flex-col justify-center text-center py-4 px-4 items-center gap-2 md:flex-row md:justify-between md:text-left">
//         <span className="text-sm">
//           <span>🔥 Your EduTreeClone is live: </span> {window.location.origin}
//           /@edudevtest
//         </span>

//         <Button
//           variant="outline"
//           className="rounded-full px-4 bg-white font-semibold text-xs md:text-[16px]"
//           onClick={copyLink}
//         >
//           {isCopiedLink ? "Copied" : "Copy your EduTree URL"}
//         </Button>
//       </div>
//     </div>
//   );
// }


"use client";

import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/hooks/useUser";
import { useState, useEffect } from "react";

export function LinkProfile() {
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const { user } = useUserInfo();
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    if (user) {
      setFullUrl(`${window.location.origin}/${user.username}`);
    }
  }, [user]);

  if (!user) return null;

  const copyLink = () => {
    if (fullUrl) {
      navigator.clipboard.writeText(fullUrl);
      setIsCopiedLink(true);
    }
  };

  return (
    <div className="bg-indigo-100 rounded-3xl">
      <div className="flex flex-col justify-center text-center py-4 px-4 items-center gap-2 md:flex-row md:justify-between md:text-left">
        <span className="text-sm">
          <span>🔥 Your EduTreeClone is live: </span>
          {fullUrl}
        </span>

        <Button
          variant="outline"
          className="rounded-full px-4 bg-white font-semibold text-xs md:text-[16px]"
          onClick={copyLink}
          disabled={!fullUrl}
        >
          {isCopiedLink ? "Copied" : "Copy your EduTree URL"}
        </Button>
      </div>
    </div>
  );
}