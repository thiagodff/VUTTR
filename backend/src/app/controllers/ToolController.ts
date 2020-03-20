import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { Toll } from '../../database/entity/Toll';
import { Tag } from '../../database/entity/Tag';
import { User } from '../../database/entity/User';

export default {
  async index(req: Request, res: Response): Promise<Response> {
    const tools = await getConnection()
      .getRepository(Toll)
      .find({ relations: ['user'] });

    const formatTools = await Promise.all(
      tools.map(async (tool: Toll) => {
        // eslint-disable-next-line object-curly-newline
        const { id, title, link, description, user } = tool;

        const tags = await getConnection()
          .getRepository(Tag)
          .find({ where: { toll: id } });

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

    return res.json(formatTools);
  },

  async store(req: Request, res: Response): Promise<Response> {
    const tools = await getConnection().getRepository(Toll);
    const repoTags = await getConnection().getRepository(Tag);

    const user = await getConnection()
      .getRepository(User)
      .findOneOrFail({ where: { id: req.userId } });

    // eslint-disable-next-line object-curly-newline
    const { title, link, description, tags } = req.body;

    const tool = new Toll();

    tool.title = title;
    tool.link = link;
    tool.description = description;
    tool.user = user;

    const saveTools = await tools.save(tool);

    const newTags = (await Promise.all(
      tags.map(async (tagName: string) => {
        const tag = new Tag();

        tag.name = tagName;
        tag.toll = saveTools;

        return tag;
      })
    )) as Tag[];

    await repoTags.save(newTags);

    return res.json(saveTools);
  }
};
