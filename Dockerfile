
FROM node:18


WORKDIR /app


COPY package.json package-lock.json ./

COPY . .

RUN npm install 


EXPOSE 3000

# Iniciar o servidor
CMD ["npm", "start"]nvm