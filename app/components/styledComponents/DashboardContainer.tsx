export const DashboardContainer = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={`bg-white rounded-md shadow-sm border border-gray-300 mx-auto ${className} w-[30vw] h-[40vh] overflow-scroll scroll-m-1 `}
    >
      {children}
    </div>
  )
}
