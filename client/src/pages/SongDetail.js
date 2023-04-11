import React from "react";
import Grid from "../components/Grid.js";
import GridItem from "../components/GridItem.js";
import PageContainer from "../components/PageContainer.js";
import EmptyState from "../components/EmptyState.js";
import { useParams } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import useSong from "../hooks/queries/useSong.js";
import SongDetailCard from "../components/SongDetailCard.js";
import SongDetailCardSkeleton from "../components/SongDetailCardSkeleton.js";

const SongDetail = () => {
  const { id } = useParams();
  const { data: songData, isLoading: songIsLoading } = useSong(id);

  useDocumentTitle(`${songData ? songData.name : "Song Detail"} | shakedown`);

  return (
    <PageContainer>
      <Grid>
        {songIsLoading && (
          <GridItem colSpan={[12, 12, 12, 8]}>
            <SongDetailCardSkeleton />
          </GridItem>
        )}
        {songData && (
          <GridItem colSpan={[12, 12, 12, 8]}>
            <SongDetailCard song={songData} />
          </GridItem>
        )}
        {!songData && !songIsLoading && (
          <GridItem>
            <EmptyState />
          </GridItem>
        )}
      </Grid>
    </PageContainer>
  );
};

export default SongDetail;
