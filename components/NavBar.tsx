import Link from 'next/link'

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b1020]/80 backdrop-blur">
      <div className="container-page flex items-center justify-between py-3">
        <Link href="/doctor" className="text-lg font-bold tracking-wide">
          MediPredict-SL
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <Link className="btn" href="/doctor">Doctor</Link>
          <Link className="btn" href="/pharmacist">Pharmacist</Link>
          <Link className="btn" href="/practice">Practice</Link>
          <Link className="btn" href="/patient">Patient</Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar