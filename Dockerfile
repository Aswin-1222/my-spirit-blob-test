# Use the official Azure Functions Node.js base image
FROM mcr.microsoft.com/azure-functions/node:4-node18

# Set working directory
WORKDIR /home/site/wwwroot

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy function app code
COPY . .

# No EXPOSE needed; Azure Functions runtime handles ports
# Default CMD is already set by the base image
