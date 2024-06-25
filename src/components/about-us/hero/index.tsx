'use client'

export default function Hero() {
  return (
    <>
      <section className="">
        <div>
          <div
            className="flex h-[600px] flex-col items-center justify-center justify-items-center p-10 shadow-md"
            style={{
              backgroundImage: "url('/hero-about.svg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center 100%',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-7xl font-bold text-white">Sobre nós</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
