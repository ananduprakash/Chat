# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock into the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code into the container
COPY . .

# Build the TypeScript code
RUN yarn build

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
