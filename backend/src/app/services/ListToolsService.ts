import { getConnection } from 'typeorm';

import { Tool } from '../../database/entity/Tool';
import { Tag } from '../../database/entity/Tag';

interface List {
  userId: number;
}

class ListTools {
  async run({ userId }: List): Promise<object[]> {
    const tools = await getConnection()
      .getRepository(Tool)
      .find({ where: { user: userId }, relations: ['user'] });

    const formatTools = await Promise.all(
      tools.map(async (tool: Tool) => {
        // eslint-disable-next-line object-curly-newline
        const { id, title, link, description, user } = tool;

        const tags = await getConnection()
          .getRepository(Tag)
          .find({ where: { tool: id } });

        const formatTags = tags.map(tag => tag.name);

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
      })
    );

    return formatTools;
  }
}

export default new ListTools();
