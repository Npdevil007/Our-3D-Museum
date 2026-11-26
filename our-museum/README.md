# Our Museum – separated prototype


This starter separates HTML, CSS and JavaScript and includes a simple local upload/preview flow.

## Run
Open `index.html` in a browser or serve this folder with a local web server. Example: `python -m http.server 8000`, then visit `http://localhost:8000`.

## Important limitation
This is only a local prototype. Museum content is stored in the browser's localStorage. It does **not** create real user accounts, cloud uploads, secure sharing links, or guest ownership. Links work only in the same browser/device where the data was created.

## Next backend step
Connect Supabase Auth (including anonymous guest sessions), a database table for museums/photos, Storage for image files, and Row Level Security policies. Do not expose the Supabase service-role key in frontend code.
