type HeaderProps = {
  headerText: string
  className?: string
}

export function PageHeader({ headerText, className = '' }: HeaderProps) {
  return (
    <div className={`pageHeader py-4 ${className}`}>
      <h1 className='font-bold text-lg'>{headerText}</h1>
    </div>
  )
}
