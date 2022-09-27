# Festivals Wiki

A wiki for your festivals!

## Configuration

## Initial run

**Assumes the user has a [Cloudinary](cloudinary.com) account**

Run the following commands in your terminal

1. `cp config/env.in config/.env`
   - Add your Cloudinary `API_KEY`, `CLOUD_NAME`, and `API_SECRET` to `config/.env`
2. start the mongo database by running `docker-compose up`
   - Alternatively, you can run `docker-compose up -d` to run mongo in detached mode
3. in a separate terminal window, (if running docker-compose in attached mode) run `npm install` to install node dependencies
4. start the server with `npm start`
   - This will always start the server.

### Subsequent run

Run steps 2 and 4.
