import Image from 'next/image'
import { Button } from '../ui/button'

export default function PetsHome() {
  return (
    <>
      <section className="px-4 pb-10 pt-10 md:pb-20">
        <div className="mx-auto flex max-w-[1200px] flex-col">
          <div className="flex flex-col items-start justify-start text-left">
            <h2 className="text-[40px] font-semibold text-[#01377D]">
              Encontre seu melhor amigo aqui!
            </h2>
            <span className="text-xl font-normal text-black">
              Aqui, você encontrará gatinhos e cachorrinhos à espera de um lar.
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4 py-16">
            <div className="flex h-[292px] w-[250px] flex-col rounded-[10px] border border-[#615e5e43] shadow-2xl">
              <div className="relative h-[226px] w-full overflow-hidden rounded-t-[10px]">
                <Image
                  priority
                  fill
                  style={{ objectFit: 'cover' }}
                  alt="NextUI hero Image"
                  src="/grid-home/gato1.png"
                />
              </div>
              <div className="flex flex-col p-2">
                <span className="text-lg font-semibold text-[#01377D]">
                  neneco
                </span>
                <span>São Paulo, Cotia</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button className="h-[50px] w-[190px] rounded-[17px] bg-[#01377D] text-xl font-medium text-white">
              Ver mais
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
