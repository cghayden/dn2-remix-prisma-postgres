import { Link } from '@remix-run/react'

export default function IndividualShoePage() {
  return (
    <div className='p-8'>
      <h2 className='text-center text-xl font-bold'>Nike Dunks</h2>
      <div className='w-48 mx-auto'>
        <img
          src='https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/dunk-low-retro-mens-shoes-87q0hf.png'
          alt='nikes pic'
        />
      </div>
      <div className='grid place-items-center'>
        <Link
          to='https://www.nike.com/t/dunk-low-womens-shoes-4W2Z5P/DD1503-101'
          className='text-indigo-700'
        >
          Preferred Store Listing
        </Link>
      </div>
      <div>
        <section>
          <h3 className='text-lg font-bold my-2'>Classes</h3>
          <ul>
            <li>Dummy Data Class Listngs</li>
            <li>Junior Hip Hop</li>
            <li>Production</li>
            <li>Junior Company Hip Hop</li>
            <li>Teen Company Hip Hop</li>
            <li>Senior Company Hip Hop</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
