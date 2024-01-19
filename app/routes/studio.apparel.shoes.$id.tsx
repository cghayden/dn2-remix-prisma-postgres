import { Link } from '@remix-run/react'

export default function IndividualShoePage() {
  return (
    <>
      <h2>Nike Dunks</h2>
      <div className='w-14'>
        <img
          src='https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/dunk-low-retro-mens-shoes-87q0hf.png'
          alt='nikes pic'
        />
      </div>
      <Link
        to='https://www.nike.com/t/dunk-low-womens-shoes-4W2Z5P/DD1503-101'
        className='text-indigo-700'
      >
        Nike Website
      </Link>
      <section>
        <h3>Classes</h3>
        <ul>
          <li>Senior Hip Hop</li>
          <li>Junior Hip Hop</li>
          <li>Production</li>
          <li>Junior Company Hip Hop</li>
          <li>Teen Company Hip Hop</li>
          <li>Senior Company Hip Hop</li>
        </ul>
      </section>
    </>
  )
}
