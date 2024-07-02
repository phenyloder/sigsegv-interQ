#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Function to display a message and exit with an error
function error_exit {
  echo "$1" 1>&2
  exit 1
}

# Update package list
echo "Updating package list..."
sudo apt-get update || error_exit "Failed to update package list."

# Install PostgreSQL and contrib package
echo "Installing PostgreSQL and contrib package..."
sudo apt-get install -y postgresql postgresql-contrib || error_exit "Failed to install PostgreSQL."

# Start the PostgreSQL service
echo "Starting PostgreSQL service..."
sudo systemctl start postgresql || error_exit "Failed to start PostgreSQL service."

# Enable PostgreSQL to start on boot
echo "Enabling PostgreSQL to start on boot..."
sudo systemctl enable postgresql || error_exit "Failed to enable PostgreSQL to start on boot."

# Create Role for Postgres
createuser -s postgres


# Set the password for the postgres user
POSTGRES_PASSWORD="root"
echo "Setting password for the postgres user..."
sudo -i -u postgres psql -c "ALTER USER postgres PASSWORD '${POSTGRES_PASSWORD}';" || error_exit "Failed to set postgres user password."

# Create a new user and set password
NEW_USER="sigsegv"
NEW_USER_PASSWORD="vgesgis"
echo "Creating new user '${NEW_USER}' with password '${NEW_USER_PASSWORD}'..."
sudo -i -u postgres psql -c "CREATE USER ${NEW_USER} WITH PASSWORD '${NEW_USER_PASSWORD}';" || error_exit "Failed to create user '${NEW_USER}'."

# Create a new database
DATABASE_NAME="fy24_applications_db"
echo "Creating new database '${DATABASE_NAME}'..."
sudo -i -u postgres createdb ${DATABASE_NAME} || error_exit "Failed to create database '${DATABASE_NAME}'."

# Grant all privileges on the new database to the new user
echo "Granting all privileges on database '${DATABASE_NAME}' to user '${NEW_USER}'..."
sudo -i -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ${DATABASE_NAME} TO ${NEW_USER};" || error_exit "Failed to grant privileges on database '${DATABASE_NAME}' to user '${NEW_USER}'."

# Run the Python script to create the database
echo "Running createDb.py..."
python ./createDb.py || error_exit "Failed to run createDb.py."

# Run the Python script to add data to the database
echo "Running addDataToDb.py..."
python ./addDataToDb.py || error_exit "Failed to run addDataToDb.py."

# Final message
echo "PostgreSQL setup and Python scripts execution are complete."
