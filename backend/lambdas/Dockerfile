FROM node:18


WORKDIR /app


COPY serverless.yml ./  



RUN npm install mongodb 
RUN npm install -g serverless@3
RUN npm install serverless-offline --save-dev

COPY functions ./functions/


EXPOSE 3000


CMD ["serverless", "offline", "start"]
