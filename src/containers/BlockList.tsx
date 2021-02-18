import { CircularProgress, Grid, IconButton } from "@material-ui/core";
import useCoreGethStore from "../stores/useCoreGethStore";
import * as React from "react";
import BlockList from "../components/BlockList";
import getBlocks from "../helpers";
import { ArrowForwardIos, ArrowBackIos } from "@material-ui/icons";
import EthereumJSONRPC, { Block as IBlock } from "@etclabscore/ethereum-json-rpc";

interface IProps {
  from: number;
  to: number;
  disablePrev: boolean;
  disableNext: boolean;
  style?: any;
  onNext?: any;
  onPrev?: any;
}

export default function BlockListContainer(props: IProps) {
  const { from, to, style } = props;
  const [erpc]: [EthereumJSONRPC, any] = useCoreGethStore();
  const [blocks, setBlocks] = React.useState<IBlock[]>();
  React.useEffect(() => {
    if (!erpc) { return; }
    getBlocks(from, to, erpc).then(setBlocks);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  if (!blocks) {
    return <CircularProgress />;
  }
  return (
    <div style={style}>
      <Grid container justify="flex-end">
        <IconButton onClick={props.onPrev} disabled={props.disablePrev}>
          <ArrowBackIos />
        </IconButton>
        <IconButton onClick={props.onNext} disabled={props.disableNext}>
          <ArrowForwardIos />
        </IconButton>
      </Grid>
      <BlockList blocks={blocks} />
    </div>
  );
}
