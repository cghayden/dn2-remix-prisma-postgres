export function NavContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className='nav_container'>
      <div>
        <nav>
          <div className='contextControl'>
            context control? keep content pushed down 3.5rem+margin, 1rem?{' '}
          </div>
          <div className='nav'>content </div>
        </nav>
      </div>
    </div>
  )
}

// .nav_container  styles
// mobile - less than 767px
//OPEN
// open = transform: translate x(-100%) > translatex(0)
// main content gray overlay on open
// CLOSED
// display:none;
// height: 100%;
// left: 0;

// MOBILE AND DESKTOP
// position:fixed
// height:100%;

// DESKTOP
// display: flex;
// height: calc(100% - headerHeight(3.5rem))
// top: 3.5rem (height of Header)
