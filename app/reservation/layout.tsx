export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-red-800'>
      <div>예약하기</div>
      {children}
    </div>
  );
}
