The folders have their own README.md

Took 2 days, things I'd improve given time:

Improvements



Backend

- verify all inputs coming from client
- remove unused endpoints
- look more into getting single values from non-pk fields on gino (i tried get, didn’t work, had to use filter.first) 
- create a response class to communalize the API responses
    - also an error class that inherits from this response class
- backend/src/fastapi_demo/features/comments/views.py::10 <— include the get_current_user dependency here since it’s required in all routes
- backend/src/fastapi_demo/features/songs/views.py::10 <- same thing here
- move backend/src/fastapi_demo/features/users/utils.py to backend/src/fastapi_demo/features/users/auth.py
- backend/src/fastapi_demo/main.py::25 <— get allowed origins from environment file



Frontend

- verify & validate inputs
- implement client validation with client and client_sercet id
- add i18next for translation and replace user facing text before it’s too late
- use styledcomponents or tailwindcss
- actually use icons
- maybe generalize the subcomponents of components and make them components
 - frontend/src/App.tsx
     - ::32 <-- use frontend/src/components/Songs/SubComponents/Single.tsx instead
     - ::<59-61> <-- remove, code artifact, we are already checking at ::56
 - frontend/src/utils/request.ts
     - Actually define Response (comes with commonalizing the backend response)
 - frontend/src/utils/token.ts
     - Implement refresh and validation token (in case the value “last” is manually modified [backend would prevent this anyways, but we don’t want undefined behavior] or maybe we will have an token invalidation system in the future)
     - ::40 <-- take the app url from .env variables
     - ::56 <-- remove credentials: "omit", we aren't using cookies (it was a copy paste from an open project)
 - frontend/src/components/Songs/
     - index.tsx <-- Remove handling of song_id and deligate the logic to Subcomponents/Single.tsx instead.
     - SubComponents/List.tsx::<11-12> <-- remove unnecessary check (it's hanled through <ErrorBoundry />
     - SubComponents/SongCreator.tsx <-- maybe add searchable dropdowns in the future
 - frontend/src/components/Comments
     - add error boundry here as well. it's currently used under Songs but it's dev facing component so it might be used as a single component in the future
     - /index.tsx::21 <-- remove the unncesssary loading check (it's handled by suspense already
