import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type FetchPagemParams = {
  pageParam?: number;
};

type FetchDataParams = {
  data: {
    title: string;
    description: string;
    url: string;
    ts: number;
    id: string;
  }[];
  after: any;
};

type Card = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};

export default function Home(): JSX.Element {
  const fetchPage = async ({
    pageParam = null,
  }: FetchPagemParams): Promise<FetchDataParams> => {
    return (
      await api.get(`/api/images`, {
        params: {
          after: pageParam,
        },
      })
    ).data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    fetchPage,
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.after) {
          return lastPage.after;
        }
        return null;
      },
    }
    // TODO GET AND RETURN NEXT PAGE PARAM
  );

  const formattedData: Card[] = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    return (
      data?.pages.reduce<Card[]>((acc, curr) => {
        return [...acc, ...curr?.data];
      }, []) || []
    );
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />;
  }
  // TODO RENDER ERROR SCREEN
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {
          /* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */
          hasNextPage && (
            <Button onClick={() => fetchNextPage()}>
              {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
            </Button>
          )
        }
      </Box>
    </>
  );
}
