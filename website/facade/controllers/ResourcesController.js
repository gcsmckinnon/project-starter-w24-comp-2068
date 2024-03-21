import ResourceService from "../services/ResourceService.js";

export const index = async (req, res, __) => {
    try {
        const resourceService = await ResourceService;
        const resources = await resourceService.index(req.headers.cookie);

        res.json(resources);
    } catch (error) {
        console.error(error);

        res.json([]);
    }
};

export const show = async (req, res, _) => {
    try {
        const resourceService = await ResourceService;
        const resource = await resourceService.show(req.params.id, req.headers.cookie);

        res.json(resource);
    } catch (error) {
        console.error(error);

        res.json({});
    }
};

export const create = async (req, res, _) => {
    try {
        const resourceService = await ResourceService;
        const resource = await resourceService.create(req.body, req.headers.cookie);

        res.json(resource);
    } catch (error) {
        console.error(error);

        res.json({});
    }
};

export const update = async (req, res, _) => {
    try {
        const resourceService = await ResourceService;
        const resource = await resourceService.update(req.params.id, req.body, req.headers.cookie);

        res.json(resource);
    } catch (error) {
        console.error(error);

        res.json({});
    }
};

export const destroy = async (req, res, _) => {
    try {
        const resourceService = await ResourceService;
        await resourceService.destroy(req.params.id, req.headers.cookie);

        res.json({});
    } catch (error) {
        console.error(error);

        res.json({});
    }
};