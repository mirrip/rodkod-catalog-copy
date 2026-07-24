"use client";

import type { LegalDocument } from "@/data/legal";
import { useState } from "react";

export function LegalDownload({ document }: { document: LegalDocument }) {
  const [confirming, setConfirming] = useState(false);

  function download() {
    const lines = [
      document.title,
      document.version,
      "",
      document.intro,
      "",
      ...document.sections.flatMap((section) => [
        section.heading,
        ...(section.paragraphs ?? []),
        ...(section.items ?? []).map((item) => `• ${item}`),
        "",
      ]),
    ];
    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement("a");
    link.href = url;
    link.download = `rodkod-${document.slug}-${document.version.slice(-10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setConfirming(false);
  }

  return (
    <div>
      <div className="legal-actions">
        <button
          className="button button-gold"
          type="button"
          onClick={() => setConfirming(true)}
          aria-expanded={confirming}
        >
          Скачать документ
        </button>
        <button className="button button-quiet" type="button" onClick={() => window.print()}>
          Сохранить в PDF
        </button>
      </div>
      {confirming ? (
        <div className="legal-download-confirm" role="group" aria-label="Подтверждение скачивания">
          <p>
            Скачать актуальную редакцию «{document.shortTitle}» в формате TXT?
          </p>
          <div>
            <button type="button" onClick={download}>Подтвердить скачивание</button>
            <button type="button" onClick={() => setConfirming(false)}>Отмена</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
