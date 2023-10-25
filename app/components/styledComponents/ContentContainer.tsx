export const ContentContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='bg-white rounded-md shadow-sm border-gray-300 p-2'>
      {children}
    </div>
  )
}
