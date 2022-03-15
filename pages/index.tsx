import { getDataFromTree } from '@apollo/client/react/ssr';
import { useCharactersQuery } from 'generated/graphql';
import withApollo from 'lib/withApollo';
import Image from 'next/image';
import Link from 'next/link';

function Home() {
  const { data, loading } = useCharactersQuery();
  // console.log('characters', data?.characters?.results);

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (!loading && data?.characters?.results?.length === 0) {
    return <div>No content</div>;
  }

  return (
    <div>
      {data?.characters?.results?.map(character => {
        return (
          <div key={character?.id}>
            <div>{character?.name || 'HU'}</div>
            <Image
              src={character?.image as string}
              alt={character?.name as string}
              height="200px"
              width="200px"
            />
            <Link href="/characters/[id]" as={`/characters/${character?.id}`}>
              {character?.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default withApollo(Home, { getDataFromTree });
