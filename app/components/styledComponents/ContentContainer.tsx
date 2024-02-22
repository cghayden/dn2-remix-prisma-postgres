export const ContentContainer = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={`bg-white rounded-md shadow-sm border border-gray-300 mx-auto ${className} `}
    >
      {children}
    </div>
  )
}
