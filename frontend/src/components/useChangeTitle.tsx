import { useEffect } from "react";

export default function useChangeTitle(title : string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}