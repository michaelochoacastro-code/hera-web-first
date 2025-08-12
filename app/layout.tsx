export const metadata = {
  title: 'Hera Talent Match',
  description: 'MVP web-first',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
