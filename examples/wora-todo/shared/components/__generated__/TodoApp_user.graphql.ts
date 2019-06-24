/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type TodoApp_user$ref = any;
export type TodoApp_user = {
    readonly id: string;
    readonly userId: string;
    readonly totalCount: number;
    readonly completedCount: number;
    readonly " $refType": TodoApp_user$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "TodoApp_user",
  "type": "User",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "userId",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalCount",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "completedCount",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '104f363735967fed6ea44437506afbc5';
export default node;