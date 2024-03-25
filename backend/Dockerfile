FROM python:3.8

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create and set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project files into the container
COPY . /app/

# Expose the port your application will run on (change this as needed)
EXPOSE 8000

# Define the command to run your application (adjust as needed)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]



#responsible for packaging our app into a docker image ..........