import Resource from "../models/Resource.js";

const resourceTypes = Resource.schema.path("type").enumValues;

export const index = async (req, res, next) => {
    try {
        const resources = await Resource.find().populate("author");

        res.format({
            "text/html": () => {
                res.render("resources/index", { resources, title: "Resources List" });
            },
            "application/json": () => {
                res.json({ resources });
            },
            default: () => {
                res.status(406).send("NOT ACCEPTABLE");
            }
        });
    } catch(error) {
        next(error);
    }
};

export const show = async (req, res, next) => {
    try {
        const resource = await Resource.findById(req.params.id).populate("author");

        res.format({
            "text/html": () => {
                res.render("resources/show", { resource, title: "Resource View" });
            },
            "application/json": () => {
                res.json({ resource });
            },
            default: () => {
                res.status(406).send("NOT ACCEPTABLE");
            }
        });
    } catch(error) {
        next(error);
    }
};

export const add = async (req, res, next) => {
    try {
        res.render("resources/add", { resourceTypes, formType: "create", title: "New Resource" });
    } catch(error) {
        next(error);
    }
};

export const edit = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) throw new Error("Missing required ID");

        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            req.status = 404;
            throw new Error("Resource does not exist");
        }

        res.render("resources/edit", { resource, resourceTypes, formType: "update", title: "Edit Resource" });
    } catch(error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const { content, type } = req.body;

        const newResource = new Resource({ content, type, author: req?.user?.id});

        await newResource.save();

        res.format({
            "text/html": () => {
                req.session.notifications = [{ alertType: "alert-success", message: "Resource was created successfully" }];
                res.redirect("/resources");
            },
            "application/json": () => {
                res.status(201).json({ status: 201, message: "SUCCESS" });
            },
            default: () => {
                res.status(406).send("NOT ACCEPTABLE");
            }
        });
    } catch(error) {
        req.session.notifications = [{ alertType: "alert-danger", message: "Resource failed to create" }];
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { content, type } = req.body;

        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            req.status = 404;
            throw new Error("Resource does not exist");
        }

        resource.content = content;
        resource.type = type;
        resource.author = req?.user?.id;

        await resource.save();

        res.format({
            "text/html": () => {
                req.session.notifications = [{ alertType: "alert-success", message: "Resource was updated successfully" }];
                res.redirect("/resources");
            },
            "application/json": () => {
                res.status(200).json({ status: 200, message: "SUCCESS" });
            },
            default: () => {
                res.status(406).send("NOT ACCEPTABLE");
            }
        });
    } catch(error) {
        req.session.notifications = [{ alertType: "alert-danger", message: "Resource failed to update" }];
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            req.status = 404;
            throw new Error("Resource does not exist");
        }

        await Resource.findByIdAndDelete(req.params.id);

        res.format({
            "text/html": () => {
                req.session.notifications = [{ alertType: "alert-success", message: "Resource was deleted successfully" }];
                res.redirect("/resources");
            },
            "application/json": () => {
                res.status(200).json({ status: 200, message: "SUCCESS" });
            },
            default: () => {
                res.status(406).send("NOT ACCEPTABLE");
            }
        });
    } catch(error) {
        req.session.notifications = [{ alertType: "alert-danger", message: "Resource failed to delete" }];
        next(error);
    }
};