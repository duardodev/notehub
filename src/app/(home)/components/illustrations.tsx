import Image from 'next/image';

export function Illustrations() {
  return (
    <div className="flex items-center justify-center gap-48">
      <div>
        <Image
          src="/engineer.svg"
          alt="Documents"
          height={320}
          width={320}
          className="dark:hidden"
        />

        <Image
          src="/engineer-dark.svg"
          alt="Documents"
          height={320}
          width={320}
          className="hidden dark:block"
        />
      </div>

      <div className="hidden lg:block">
        <Image
          src="/work-from-home.svg"
          alt="Documents"
          height={360}
          width={360}
          className="dark:hidden"
        />

        <Image
          src="/work-from-home-dark.svg"
          alt="Documents"
          height={360}
          width={360}
          className="hidden dark:block"
        />
      </div>
    </div>
  );
}
