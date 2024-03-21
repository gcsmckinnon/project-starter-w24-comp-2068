import APIProvider from "../utilities/APIProvider.js";

const ResourceService = (async () => {
    const apiProvider = await APIProvider();

    return {
        index: async (cookies) => {
            try {                
                const resources = await apiProvider.get("/resources", {
                    headers: {
                        Cookie: cookies
                    }
                });

                return resources.data?.resources || [];
            } catch (error) {
                throw error;
            }
        },

        show: async (id, cookies) => {
            try {
                const resource = await apiProvider.get(`/resources/${id}`, {
                    headers: {
                        Cookie: cookies
                    }
                });

                return resource.data?.resource || {};
            } catch (error) {
                throw error;
            }
        },

        create: async (resource, cookies) => {
            try {
                await apiProvider.post("/resources", resource, {
                    headers: {
                        Cookie: cookies
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        update: async (id, resource, cookies) => {
            try {
                await apiProvider.put(`/resources/${id}`, resource, {
                    headers: {
                        Cookie: cookies
                    }
                });
            } catch (error) {
                throw error;
            }
        },

        destroy: async (id, cookies) => {
            try {
                await apiProvider.delete(`/resources/${id}`, {
                    headers: {
                        Cookie: cookies
                    }
                });
            } catch (error) {
                throw error;
            }
        },
    };
})();

export default ResourceService;