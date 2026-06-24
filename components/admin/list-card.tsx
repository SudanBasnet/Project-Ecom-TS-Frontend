type AdminListCardProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

const AdminListCard = ({
  children,
  className = "",
}: AdminListCardProps) => {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
};

export default AdminListCard;
