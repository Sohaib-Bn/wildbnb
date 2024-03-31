function FooterLink({ link, children }) {
  return (
    <li className="flex items-center gap-3">
      <span>&bull;</span>
      <a
        className="h-full transition-all duration-300 hover:underline"
        href={`${link}`}
      >
        {children}
      </a>
    </li>
  );
}

export default FooterLink;
