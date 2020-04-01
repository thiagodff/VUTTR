import { getConnection } from 'typeorm';

import { Tool } from '../../database/entity/Tool';
import { Tag } from '../../database/entity/Tag';

interface ListSearch {
  tag: string;
  userId: number;
}

class ListSearchTools {
  async run({ tag, userId }: ListSearch): Promise<object[]> {
    const tags = await getConnection().getRepository(Tag);
    const tools = await getConnection().getRepository(Tool);

    const findTags = await tags.find({
      where: { name: tag },
      relations: ['tool']
    });

    if (findTags.length === 0) {
      return [{ message: 'No tag found' }];
    }

    const findTools = findTags.map(findTag => findTag.tool);

    const formatTools = await Promise.all(
      await findTools.map(async (findTool: Tool) => {
        const tool = (await tools.findOne({
          where: { id: findTool.id },
          relations: ['user']
        })) as Tool;

        const searchTags = await tags.find({ where: { tool: findTool.id } });

        const formatTags = searchTags.map(searchTag => searchTag.name);

        // eslint-disable-next-line object-curly-newline
        const { id, title, link, description, user } = tool;

        if (user.id === userId) {
          return {
            id,
            title,
            link,
            description,
            tags: formatTags,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          };
        }
        return false;
      })
    );

    const filterTools = formatTools.filter(
      formatTool => formatTool
    ) as object[];

    return filterTools;
  }
}

export default new ListSearchTools();
