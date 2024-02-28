interface SoftwareCreditCardProps {
  url: string;
  logoUrl: string;
  name: string;
  partOfApp: string;
}

export function SoftwareCreditCard({
  url,
  logoUrl,
  name,
  partOfApp,
}: SoftwareCreditCardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0.5rem",
      }}
    >
      <img src={logoUrl} alt={name} style={{ maxWidth: "128px" }} />
      <a href={url}>{name}</a>
      <p>{partOfApp}</p>
    </div>
  );
}
