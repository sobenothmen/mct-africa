function splitBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((chunk, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-[#10233a]">
        {chunk}
      </strong>
    ) : (
      <span key={i}>{chunk}</span>
    ),
  );
}

export function RichParagraph({ text }: { text: string }) {
  return <p className="leading-relaxed text-[#5b6979]">{splitBold(text)}</p>;
}
