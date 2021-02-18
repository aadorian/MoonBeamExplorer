import { CircularProgress } from "@material-ui/core";
import useCoreGethStore from "../stores/useCoreGethStore";
import * as React from "react";
import BlockRaw from "../components/BlockRaw";
import EthereumJSONRPC, { Block as IBlock } from "@etclabscore/ethereum-json-rpc";

export default function BlockRawContainer(props: any) {
  const { match: { params: { hash } } } = props;
  const [erpc]: [EthereumJSONRPC, any] = useCoreGethStore();
  const [block, setBlock] = React.useState<IBlock>();
  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_getBlockByHash(hash, true).then((b) => {
      if (b === null) { return; }
      setBlock(b);
    });
  }, [hash, erpc]);
  if (!block) { return (<CircularProgress />); }
  return (<BlockRaw block={block} />);
}
