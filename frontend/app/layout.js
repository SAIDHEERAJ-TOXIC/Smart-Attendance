export const metadata = {
  title: 'Smart Attendance',
  description: 'Secure attendance with QR and face verification',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Inter, system-ui, Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
