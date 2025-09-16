# Use an official Python runtime as the base image
FROM python:3.8-slim
WORKDIR /app
ADD requirements.txt .
ADD app.py .

# Install the ODBC driver and its dependencies
RUN apt-get update 
RUN apt-get install unixodbc -y 
RUN apt-get install unixodbc-dev -y 
# RUN apt-get install -y msodbcsql17
RUN apt-get update && apt-get install -y curl gnupg
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17

# Copy the requirements file into the container
COPY requirements.txt .

# Install any dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port your Flask app runs on
EXPOSE 5000

# Command to run the application
CMD ["python", "app.py"]
