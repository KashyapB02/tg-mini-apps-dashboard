import React from "react";
import FooterStyles from "@/styles/components/footer.module.css";
import { FaXTwitter } from "react-icons/fa6";

export const Footer: React.FunctionComponent = (): JSX.Element => {
  return (
    <footer className={FooterStyles.appFooter}>
      <a href="https://x.com/Lyncworld" target="_blank" rel="noopener noreferrer" className={FooterStyles.twitter}>
        <FaXTwitter color="#191919" />
      </a>
      <div className={FooterStyles.branding}>
        Powered by{" "}
        <a href="https://lync.world/" target="_blank" rel="noopener noreferrer" className={FooterStyles.brandLink}>
          <img src="/lync-branding.webp" alt="Lync" className={`${FooterStyles.brandImg} ${FooterStyles.withText}`} />
          <img src="/lync.webp" alt="Lync" className={`${FooterStyles.brandImg} ${FooterStyles.logoOnly}`} />
        </a>
      </div>
      <small className={FooterStyles.copyRight}>&copy; {new Date().getFullYear()} LYNC</small>
    </footer>
  );
};
