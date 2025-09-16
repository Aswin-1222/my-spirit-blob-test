FROM mcr.microsoft.com/azure-functions/python:4-python3.11

WORKDIR /home/site/wwwroot

COPY requirements.txt /
RUN pip install -r /requirements.txt

COPY . /home/site/wwwroot
