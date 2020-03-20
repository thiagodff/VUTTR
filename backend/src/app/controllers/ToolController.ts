import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { Tool } from '../../database/entity/Tool';
import { Tag } from '../../database/entity/Tag';
import { User } from '../../database/entity/User';

export default {
  async show(req: Request, res: Response): Promise<Response> {
    const tags = await getConnection().getRepository(Tag);
    const tools = await getConnection().getRepository(Tool);

    const { tag } = req.query;

    const findTags = await tags.find({
      where: { name: tag },
      relations: ['tool']
    });

    if (findTags.length === 0) {
      return res.status(401).json({ error: 'Nenhuma tag encontrada' });
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

  async index(req: Request, res: Response): Promise<Response> {
    const tools = await getConnection()
      .getRepository(Tool)
      .find({ where: { user: req.userId }, relations: ['user'] });

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

    return res.json(formatTools);
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
