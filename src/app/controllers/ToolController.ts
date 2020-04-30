import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { Tool } from '../../database/entity/Tool';
import { Tag } from '../../database/entity/Tag';
import { User } from '../../database/entity/User';

import ListSearchTools from '../services/ListSearchToolsService';
import ListTools from '../services/ListToolsService';

export default {
  async index(req: Request, res: Response): Promise<Response> {
    const { tag } = req.query;
    const { userId } = req;

    let tools;

    if (typeof tag === 'string') {
      tools = await ListSearchTools.run({ tag, userId });
    } else {
      tools = await ListTools.run({ userId });
    }

    return res.json(tools);
  },

  async store(req: Request, res: Response): Promise<Response> {
    const tools = await getConnection().getRepository(Tool);
    const repoTags = await getConnection().getRepository(Tag);

    const user = await getConnection()
      .getRepository(User)
      .findOneOrFail({ where: { id: req.userId } });

    // eslint-disable-next-line object-curly-newline
    const { title, link, description, tags } = req.body;

    const tool = new Tool();

    tool.title = title;
    tool.link = link;
    tool.description = description;
    tool.user = user;

    const saveTools = await tools.save(tool);

    const newTags = (await Promise.all(
      tags.map(async (tagName: string) => {
        const tag = new Tag();

        tag.name = tagName;
        tag.tool = saveTools;

        return tag;
      })
    )) as Tag[];

    await repoTags.save(newTags);

    const { id } = saveTools;

    return res.status(201).json({
      id,
      title,
      link,
      description,
      tags
    });
  },

  async remove(req: Request, res: Response): Promise<Response> {
    const tools = await getConnection().getRepository(Tool);

    const tool = await tools.findOne({ where: { id: req.params.id } });

    if (tool) {
      await tools.remove(tool);
    } else {
      return res.status(401).json({ error: 'Ferramenta não encontrada' });
    }

    return res.status(204).json();
  }
};
