import { NotUndefined } from "@redux-saga/types";
import { EventChannel } from "redux-saga";

export const graphChannels: { [id: string]: EventChannel<NotUndefined> } = {};
