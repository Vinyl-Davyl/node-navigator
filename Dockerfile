FROM node:18

# Create and change to the app directory
WORKDIR /app

# Copy client package files
COPY client/package*.json client/

# Copy server package files
COPY server/package*.json server/

# Install client dependencies
RUN npm install --prefix client --only=production

# Install server dependencies
RUN npm install --prefix server --only=production

# Copy the rest of your app's source code
COPY . .

# Command to run your app
CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8000
