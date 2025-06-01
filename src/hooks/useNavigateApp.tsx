import { useRouter, usePathname, useParams } from "next/navigation";

export function useNavigateApp() {
  const router = useRouter();
  const path = usePathname();
  const params = useParams();

  function navigate(url?: string) {
    if (url) {
      router.replace(url);
    }
  }

  return {
    navigate,
    path,
    params,
  };
}
