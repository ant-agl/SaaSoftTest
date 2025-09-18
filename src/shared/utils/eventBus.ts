import mitt from "mitt";

type Events = {};

export const eventBus = mitt<Events>();
