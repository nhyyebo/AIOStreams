import React from 'react';

export const metadata = {
  title: 'AIOStreams - Formatter Helper',
  description: 'A helper tool for creating custom formatters in AIOStreams',
};

export default function FormatterHelperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="formatter-helper-layout">
      {children}
    </section>
  );
}
