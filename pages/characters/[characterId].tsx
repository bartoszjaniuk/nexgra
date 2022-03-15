import { getDataFromTree } from '@apollo/client/react/ssr';
import { useCharacterQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import withApollo from '../../lib/withApollo';

function SingleCharacterPage() {
  const router = useRouter();
  const { characterId } = router.query;

  console.log(router.query);

  const { data } = useCharacterQuery({
    variables: {
      id: characterId as string,
    },
  });

  return <div>{JSON.stringify(data)}</div>;
}

export default withApollo(SingleCharacterPage, { getDataFromTree });
