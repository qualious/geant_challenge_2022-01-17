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


# Original Task:

### Description

The development team is assigned to design and develop a new service. The marketing team has named the service «SongBook». The service kickstarts a community of people interested in songs by enabling authenticated users to view information about songs and discuss them through comments.

The application should be structured in three parts:

    A remote data store that stores information about the songs, the users and their comments.
    A backend application that exposes a RESTful API to manage users, songs and comments.
    A frontend application, that uses the API exposed by the backend, to authenticate users and present them with a responsive interface to view information about songs, add new songs and add comments about a song.

### Technology stack

    Development progress and iterations are tracked through this Github repository.
    The backend application must be built with Python3 using the FastAPI web framework.
    The frontend application should be built with Vue or a React-based framework.
    The storage backend we use in production is a Postgres database, but feel free to use the database system you’re most comfortable with.
    You are free to use any other tool or library you see fit for the application.

### Requirements

    The users need to register and authenticate before using the application.
    Authenticated users can view information about songs and their comments.
    Authenticated users can add new songs.
    Authenticated users can add comments to any song.
    Authenticated users can delete their accounts.
    Authenticated users can delete their comments.
    Authenticated users see the list of songs they have added on the homepage.
    Authenticated users can use a CLI tool like curl to query the API and do all actions above.

### Other notes

    We do not expect a rich data model for the users, the songs and any other entity in the system. Basic information like username and email, and title, artist and the release date is good enough.
    There is no search functionality. We assume that users know the URL of a song to view the song’s information and comments.
    There is no need to send emails or verify user email addresses during registration.
    We expect a responsive design, but otherwise basic look and feel. We do expect proper usage of HTML elements.
    The frontend application should dynamically validate user input.
    Your design and code should meet the requirements above, be well structured and documented to allow for flexibility and future extensibility.

