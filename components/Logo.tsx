import Image from "next/image";
import { site } from "@/content/site";

export default function Logo() {
  return (
    <a className="brand" href="#top" aria-label={`${site.name} — home`}>
      <Image src="/images/logo-mark.png" alt="" width={46} height={46} priority />
      <span>
        {site.shortName}
        <small>INITIATIVE</small>
      </span>
    </a>
  );
}
