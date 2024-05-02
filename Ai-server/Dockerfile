FROM python:3.10

WORKDIR /src

# Install app dependencies
COPY ./requirements.txt ./

RUN pip install -r requirements.txt

# Bundle app source
COPY ./app ./app

EXPOSE 9999
CMD [ "python", "./app/main.py" ]