export const ContentContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='bg-white rounded-md shadow-sm border border-gray-300'>
      {children}
    </div>
  )
}
