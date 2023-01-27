import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { dehydrate, useQuery } from "react-query";
import { IAlbum } from "../../@types/album";
import getQueryClient from "../../utils/queryClient";

const AlbumPage = () => {
  // Router

  const router = useRouter();

  const { id } = router.query;

  // React Query

  const { data: album } = useQuery<IAlbum>([`albums/${id}`], {
    refetchOnWindowFocus: true,
  });

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-5 grid-cols-12">
        <div className="col-span-3">
          <div
            className="w-full aspect-square background-image"
            style={{ backgroundImage: `url(${album?.cover})` }}
          ></div>
        </div>
        <div className="col-span-6">
          <h1 className="text-3xl font-bold">{album?.artist.name}</h1>
          <h2 className="text-xl font-bold">{album?.title}</h2>
          <p className="text-lg">{album?.year}</p>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
  query,
}: any) => {
  const { id } = query;

  const queryClient = getQueryClient();

  await queryClient.fetchQuery([`albums/${id}`]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
