import {Inter} from 'next/font/google';
import {ReactNode} from 'react';
import {TetrisGridView} from '@/components/grid';

const inter = Inter({subsets: ['latin']});

/**
 * @return {ReactNode}
 */
export default function Home(): ReactNode {
  return (
    <main className={`${inter.className} bg-grey h-screen
      flex flex-col items-center px-8 py-20`}>
      <TetrisGridView numCols={10} numRows={20} />
    </main>
  );
}
