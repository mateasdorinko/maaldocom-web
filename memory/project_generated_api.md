---
name: Generated API client quirks
description: How the openapi-generator output is fixed and used in this project
type: project
---

The openapi-generator typescript-axios output has two known issues in this project:

1. **allOf type aliases**: The generator produces broken `type Foo = BaseModel` aliases instead of proper interfaces for allOf schemas. After running `npm run api:generate`, manually fix the model files in `src/server/api/generated/models/` to use `interface Foo extends BaseModel { ... }` with all properties.

2. **Constructor signature**: The generated `BaseAPI` constructor is `(configuration?, basePath?, axios?)`. The API instances must be created as `new FooApi(undefined, undefined, apiClient)` — passing the AxiosInstance as the 3rd argument, not 1st.

3. **baseURL placeholder**: Both `apiClient` and `authenticatedApiClient` have `baseURL: 'http://placeholder'` set so the generated client uses relative paths. The request interceptors then override `config.baseURL` with the real `API_BASE_URL` per-request.

4. **Field rename**: The API renamed `urlFriendlyName` → `slug` on `GetMediaAlbumResponse` (and related types). All code now uses `.slug`.

**Why:** The openapi-generator has known issues with allOf composition in TypeScript. These are post-generation manual fixes that must be reapplied after each `npm run api:generate`.

**How to apply:** After any `npm run api:generate` run, check the generated model files and fix any `type Foo = BaseModel` patterns back to proper interface extensions.
