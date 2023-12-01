export const ContentContainer = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={`bg-white rounded-md shadow-sm border border-gray-300 ${className}`}
    >
      {children}
    </div>
  )
}

export default function MyComponent() {
  return (
    <ContentContainer className='max-w-[600px]'>
      <p>Hello from my container</p>
    </ContentContainer>
  )
}
