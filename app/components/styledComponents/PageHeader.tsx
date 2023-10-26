type HeaderProps = {
  headerText: string
}

export function PageHeader({ headerText }: HeaderProps) {
  return (
    <div className='pageHeader py-4'>
      <h1 className='font-bold text-lg'>{headerText}</h1>
    </div>
  )
}
