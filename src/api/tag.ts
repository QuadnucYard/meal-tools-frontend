import type { Tag, TagCreate, TagUpdate } from "@/interfaces";

import { createAPIRoute } from "./api-route";

export const {
  gets: getTags,
  create: createTag,
  update: updateTag,
  remove: deleteTag,
} = createAPIRoute<Tag, TagCreate, TagUpdate>("/tag");
